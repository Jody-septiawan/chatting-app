const { user } = require("../../models");

const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({
        error: {
            message: error.details[0].message,
        }
    });

  try {

    const userCheck = await user.findOne({
        where: {
            email: req.body.email
        }
    })

    if(userCheck){
        return res.send({
            error: {
                message: `email \"${req.body.email}\" already`
            }
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword

    const newUser = await user.create(req.body);

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY);

    res.send({
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        error: {
            message: "Server Error",
        }
    });
  }
};

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);

  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
      },
    });

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if(!userExist){
        return res.send({
            error: {
                message: 'Email not found!'
            }
        })
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.send({
        error: {
            message: 'Email or Password not match!'
        }
      });
    }

    const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);

    res.status(200).send({
      data: {
        id: userExist.id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        status: userExist.status,
        token,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
        error: {
            message: "Server Error",
        }
    });
  }
};

exports.getUsers = async (req,res) => {
    try {
        const users = await user.findAll();

        res.send({
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: {
                message: 'Server Error',
                error
            }
        })
    }
}

exports.getUser = async (req,res) => {
    try {
        const userData = await user.findOne({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            },
            where: {
                id: req.user.id
            }
        });

        if(!userData){
            return res.status(400).send({
                error: {
                    message: 'User not found!'
                }
            })
        }

        res.send({
            user: userData
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: {
                message: 'Server Error',
                error
            }
        })
    }
}