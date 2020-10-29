// 3d-party libs
const debug = require("debug")("vidly:started");
const config = require("config");

// express imports
const express = require("express");
const app = express();
const auth = require("./routes/auth");
const users = require("./routes/users");
const movies = require("./routes/movies");
const genres = require("./routes/genres");
const home = require("./routes/home");

// middlewares
const morgan = require("morgan");
const { dbStart } = require("./db");

app.set("view engine", "pug");

if (!config.get("jwtKey")) {
  console.error("Fatal ERROR : SET 'V_JWTKEY' Variable");
  process.exit(1);
}

dbStart();

// uses
app.use(morgan("tiny"));
app.use(express.json());
app.use("/", home);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/movies", movies);
app.use("/api/genres", genres);

//listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Running on Port : ${port}`));
