// express imports
const express = require("express");
const router = express.Router();

//get
router.get("/", (req, res) => {
  res.render("index", {
    title: "Vidly",
    message: "Vidly Backend By Zahw ♥",
  });
});

module.exports = router;
