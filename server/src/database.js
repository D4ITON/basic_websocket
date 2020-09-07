const mongoose = require("mongoose");
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const connect = mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Base de datos iniciada"));

module.exports = connect;
