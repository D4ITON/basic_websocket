const { Schema, model } = require("mongoose");

const ChatSchema = new Schema(
  {
    message: String,
  },
  { timestamps: true }
);

module.exports = model("Chat", ChatSchema);
