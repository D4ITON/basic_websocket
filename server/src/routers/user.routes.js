const express = require("express");
const UserController = require("../controllers/user.controller");
const middleware = require("../utils/verifyToken");

const api = express.Router();

api.post("/sign-up", UserController.Register);
api.post("/sign-in", UserController.Login);
api.get("/users", middleware.verifyToken, UserController.getUsers);

module.exports = api;
