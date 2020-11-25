const express = require("express");
const router = express.Router();
const _ = require("lodash");
const mongoose = require("mongoose");
const { ToDo, validateToDo } = require("../models/ToDo");

router.get("/", async (req, res) => {
  const todos = await ToDo.find().sort("dateCreated");
  res.send(todos);
});

router.post("/", async (req, res) => {
  const { error } = validateToDo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const todo = new ToDo(_.pick(req.body, ["title", "description", "isDone"]));
  await todo.save();
  res.send(todo);
});

router.put("/:id", async (req, res) => {
  const { error } = validateToDo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).send("Invalid ID");

  const todo = await ToDo.findById(id);
  if (!todo) return res.status(404).send("No Such ToDo");

  todo.set(_.pick(req.body, ["title", "description", "isDone"]));
  await todo.save();

  res.send(todo);
});

router.delete("/:id", async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndRemove(req.params.id);
    if (!todo) return res.status(404).send("No Such ToDo or Deleted");
    res.send(todo);
  } catch (ex) {
    res.status(400).send("Invalid ID");
  }
});

module.exports = router;
