const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Genre } = require("../models/Genre");
const { Movie, validateMovie } = require("../models/Movie");

router.get("/", async (req, res) => {
  const id = req.query.id;
  const movies = await Movie.find(id ? { _id: id } : null).select({
    title: true,
  });
  res.send(movies);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.message);

  const genre = await Genre.findById(req.body.genreID);
  if (!genre) return res.status(400).send("Invalid Genre.");

  const { title, genreID } = req.body;

  const movie = new Movie({
    title,
    genre: {
      _id: genreID,
      name: genre.name,
    },
  });

  await movie.save();
  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  try {
    const removed = await Movie.findByIdAndDelete(req.params.id);
    res.send(removed);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

module.exports = router;
