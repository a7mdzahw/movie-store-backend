const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash");

const auth = require("../middlewares/auth");
const { ToDo, validateToDo } = require("../models/ToDo");

router.get("/", auth, async (req, res) => {
  const userId = req.user._id;
  const todos = await ToDo.find({ userId }).sort("dateCreated");
  res.send(todos);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateToDo(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const body = {
    ..._.pick(req.body, ["title", "description", "isDone"]),
    userId: req.user._id,
  };
  const todo = new ToDo(body);
  await todo.save();
  res.send(todo);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateToDo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) return res.status(400).send("Invalid ID");

  const todo = await ToDo.find({ userId: req.user._id, _id: id });
  if (!todo) return res.status(404).send("No Such ToDo");

  todo.set(_.pick(req.body, ["title", "description", "isDone"]));
  await todo.save();

  res.send(todo);
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await ToDo.find({ userId: req.user._id, _id: req.params.id });
    if (!todo.length) {
      return res.status(404).send("No Such ToDo or Deleted");
    }
    await ToDo.deleteOne({ _id: req.params.id });
    res.send(todo);
  } catch (ex) {
    res.status(400).send("Invalid ID");
  }
});

module.exports = router;
