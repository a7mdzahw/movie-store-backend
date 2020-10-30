const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const movies = require("../routes/movies");
const genres = require("../routes/genres");
const home = require("../routes/home");
const error = require("../middlewares/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", home);
  app.use("/api/auth", auth);
  app.use("/api/users", users);
  app.use("/api/movies", movies);
  app.use("/api/genres", genres);
  app.use(error);
};
