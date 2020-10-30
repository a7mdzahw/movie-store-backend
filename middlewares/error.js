const winston = require("winston");

module.exports = (err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send("Somthing Failed at the Server");
};
