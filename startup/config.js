const config = require("config");

module.exports = function (app) {
  app.set("view engine", "pug");

  if (!config.get("jwtKey")) {
    console.error("Fatal ERROR : SET 'V_JWTKEY' Variable");
    process.exit(1);
  }
};
