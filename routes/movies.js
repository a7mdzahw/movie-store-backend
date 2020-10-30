const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Genre } = require("../models/Genre");
const { Movie, validateMovie } = require("../models/Movie");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  const id = req.query.id;
  const movies = await Movie.find(id ? { _id: id } : null).select({
    title: true,
  });
  res.send(movies);
});

router.post("/", auth, async (req, res) => {
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

router.put("/:id", auth, async (req, res) => {
  try {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.message);

    let movie = await Movie.findById(req.params.id);
    let genre = await Genre.findById(req.body.genreID);
    if (!genre) return res.status(400).send("Invalid Genre.");

    const { title, genreID } = req.body;
    movie.set({
      title,
      genre: {
        _id: genreID,
        name: genre.name,
      },
      ...req.body,
    });

    await movie.save();
    res.send(movie);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const removed = await Movie.findByIdAndDelete(req.params.id);
    res.send(removed);
  } catch (ex) {
    res.status(404).send(ex.message);
  }
});

module.exports = router;
