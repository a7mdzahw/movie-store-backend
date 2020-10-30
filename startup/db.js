const mongoose = require("mongoose");
const config = require("config");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect(config.get("db") || "mongodb://localhost/vidly", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    .then(() => winston.info(`Connected to MongoDB (:`))
    .catch((err) =>
      console.error(`Can't connect to MongoDb :( ${err.message}`)
    );
};
