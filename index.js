// express imports
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/config")(app);
require("./startup/db")();
require("./startup/routes")(app);

//listen
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Running on Port : ${port}`));
