const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { User } = require("../models/User");
const Joi = require("joi");

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(400).send("Invalid Email or Password");

  const token = user.genToken();
  res.send(token);
});

function validateLogin(user) {
  const schema = Joi.object({
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required().min(4),
  });

  return schema.validate(user);
}

module.exports = router;
