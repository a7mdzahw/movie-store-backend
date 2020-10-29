const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const { genreSchema } = require("./Genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: Number,
    dailyRentalRate: Number,
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genreID: Joi.objectID().required(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
  });

  return schema.validate(movie);
}

module.exports = {
  Movie,
  validateMovie,
};
