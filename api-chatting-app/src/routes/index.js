const express = require("express");

const router = express.Router();

const { register, login, getUsers, getUser } = require("../controllers/auth");

const { auth } = require("../middlewares/auth");

router.get("/users", getUsers);
router.get("/user", auth, getUser);

router.post("/register", register);
router.post("/login", login);

module.exports = router;
