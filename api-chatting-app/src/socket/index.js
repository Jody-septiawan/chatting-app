const { chat, user } = require('../../models');

const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');

const connectedUser = {};

const socketIo = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      next();
    } else {
      next(new Error('Not Authorized'));
    }
  });

  io.on('connection', async (socket) => {
    const token = socket.handshake.auth.token;
    const tokenKey = process.env.TOKEN_KEY;
    const verified = jwt.verify(token, tokenKey);

    const userId = verified.id;
    connectedUser[userId] = socket.id;

    socket.on('load contact', async () => {
      try {
        const contact = await user.findAll({
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
          where: { id: { [Op.ne]: userId } },
        });

        socket.emit('contact', contact);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('load message', async (payload) => {
      try {
        const receiver = payload;
        const sender = userId;

        const data = await chat.findAll({
          where: {
            sender: {
              [Op.or]: [receiver, sender],
            },
            receiver: {
              [Op.or]: [receiver, sender],
            },
          },
          include: [
            {
              model: user,
              as: 'receiverUser',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
            {
              model: user,
              as: 'senderUser',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            },
          ],
          order: [['createdAt', 'ASC']],
          attributes: {
            exclude: [, 'updatedAt', 'receiver', 'sender'],
          },
        });

        let isOnline = false;

        if (connectedUser[receiver]) {
          isOnline = true;
        }

        console.log(isOnline);

        socket.emit('messages', { data, isOnline });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('send message', async (payload) => {
      try {
        const { receiver, message } = payload;

        const resChat = await chat.create({
          sender: userId,
          receiver,
          message,
        });

        if (resChat) {
          io.to(socket.id).to(connectedUser[receiver]).emit('new message');
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('typing', async (payload) => {
      io.to(connectedUser[payload.receiver]).emit('typing', {
        userId,
        status: payload.status,
      });
    });

    socket.on('disconnect', () => {
      delete connectedUser[userId];
    });
  });
};

module.exports = socketIo;
