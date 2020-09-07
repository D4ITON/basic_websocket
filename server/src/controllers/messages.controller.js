const Chat = require("../models/Chat");

async function sendDataToClient(message, io) {
  try {
    const chat = new Chat({ message });
    chat.save((err, doc) => {
      if (err) return console.log(err);
      return io.emit("output_from_server", doc);
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = function (socket, io) {
  socket.on("initial_data", function (message) {
    sendDataToClient(message, io);
  });
};
