const mongoose = require("mongoose");
const config = require("config");

function dbStart() {
  mongoose
    .connect(config.get("db") || "mongodb://localhost/vidly", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`Connected to MongoDB ... (: `))
    .catch((err) =>
      console.error(`Can't connect to MongoDb :( ${err.message}`)
    );
}

exports.dbStart = dbStart;
