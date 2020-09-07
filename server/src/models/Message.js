const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    bodyOfMessage: String,
  },
  { timestamps: true }
);

module.exports = model("Message", MessageSchema);
