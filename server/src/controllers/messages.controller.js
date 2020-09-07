const Chat = require("../models/Chat");

async function sendDataToClient(io) {
  try {
    const messages = await Chat.find({});
    // console.log(messages);
    io.emit("load_messages", messages);
  } catch (err) {
    console.log(err);
  }
}

async function setNewMessage(message, io) {
  try {
    const chat = new Chat({ message });
    const messageStored = await chat.save();
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
