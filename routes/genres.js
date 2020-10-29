// express imports
const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();

const { Genre, validateGenre } = require("../models/Genre");

// get
router.get("/", async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const genres = await Genre.find(id ? { _id: id } : null);
  res.send(genres);
});

//post
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send({ Error: error.message });
  const genre = await new Genre({
    name: req.body.name,
  });
  genre.save();
  res.send(genre);
});

//update
router.put("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
        },
      },
      { new: true, useFindAndModify: false }
    );

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.message);

    res.send(genre);
  } catch (ex) {
    res.status(404).send({ error: "No Such Genre" });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    genre.deleteOne(() => res.send(genre));
  } catch (ex) {
    res.status(404).send("Aleardy Deleted or Not Exists");
  }
});

module.exports = router;

// const genre = genres.find((g) => g.id === parseInt(req.params.id));
// if (!genre) return res.status(404).send("No Such Genre");
// const { error } = validate(req.body);
// if (error) return res.status(400).send({ Error: "Bad Request" });

// genre.name = req.body.name;
// res.send(genre);

// const genre = genres.find((g) => g.id === parseInt(req.params.id));
// if (!genre) return res.status(404).send("No Such Genre");

// const index = genres.indexOf(genre);
// genres.splice(index, 1);
// res.send(genre);
