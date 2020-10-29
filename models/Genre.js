const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
};

module.exports = {
  Genre,
  genreSchema,
  validateGenre,
};
