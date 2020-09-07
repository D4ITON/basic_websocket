const app = require("./app");
require("dotenv").config();
require("./database");
// const connect = require("./database");

// sockets
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const MessageController = require("./controllers/messages.controller");

// async function init() {
//   await app.listen(3009);
//   console.log("Server on port: 3009");
// }

// init();

server.listen(3009, () => {
  console.log("server on port 3009");
});

// io.on("connection", (socket) => {
//   socket.on("initial_data", (message) => {
//     MessageController.sendDataToClient(message);
//   });

//   socket.on("input_from_client", (message) => {
//     MessageController.sendDataToClient(message);
//   });
// });

io.on("connection", (socket) => {
  require("./controllers/messages.controller")(socket, io);

  // return io;
});
