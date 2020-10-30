require("express-async-errors");
const winston = require("winston");

module.exports = function () {
  winston.add(
    new winston.transports.Console({
      format: winston.format.simple(),
      colorize: true,
      prettyPrint: true,
    })
  );
  winston.add(new winston.transports.File({ filename: "w_log.log" }));
  winston.exceptions.handle(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true,
      format: winston.format.simple,
    }),
    new winston.transports.File({ filename: "w_log.log" })
  );
};
