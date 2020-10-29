// express imports
const express = require("express");
const router = express.Router();

//get
router.get("/", (req, res) => {
  res.render("index", {
    title: "Vidly",
    message: "This is my First Pug App",
  });
});

module.exports = router;
