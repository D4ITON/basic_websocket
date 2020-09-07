const Message = require("../models/Message");

async function sendDataToClient(io) {
  try {
    const messages = await Message.find({});
    io.emit("load_messages", messages);
  } catch (err) {
    console.log(err);
  }
}

async function setNewMessage(messageParam, io) {
  try {
    const message = new Message({ bodyOfMessage: messageParam });
    const messageStored = await message.save();
    if (messageStored) sendDataToClient(io);
  } catch (err) {
    console.log(err);
  }
}

module.exports = function (socket, io) {
  socket.on("set_message", function (message) {
    setNewMessage(message, io);
  });

  socket.on("load_initial_data", function () {
    sendDataToClient(io);
  });
};
