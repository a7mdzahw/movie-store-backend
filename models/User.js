const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 255 },
  email: { type: String, required: true, maxlength: 255, unique: true },
  password: { type: String, required: true, maxlength: 1024 },
});

userSchema.methods.genToken = function () {
  return jwt.sign({ _id: this._id, email: this.email }, config.get("jwtKey"));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().required().min(4).max(255),
    email: Joi.string().required().max(255).email(),
    password: Joi.string().required().min(4),
  });

  return schema.validate(user);
}

module.exports = {
  User,
  validateUser,
};
