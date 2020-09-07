const express = require("express");
const mongoose = require("mongoose");
const app = express();

// database conection
mongoose
  .connect("mongodb://localhost/websockets", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Database initialized"));

app.use(express.json()); //  this replace body-parser
app.use(express.urlencoded({ extended: true })); // to html forms

// sockets instalation
const server = require("http").createServer(app);
const io = require("socket.io")(server);

server.listen(3009, () => {
  console.log("server on port 3009");
});

// to load socket on differents files
io.on("connection", (socket) => {
  require("./controllers/messages.controller")(socket, io);
});
