const mongoose = require("mongoose");

function dbStart() {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`Connected to MongoDB ... (: `))
    .catch((err) =>
      console.error(`Can't connect to MongoDb :( ${err.message}`)
    );
}

exports.dbStart = dbStart;
