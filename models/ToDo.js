const Joi = require("joi");
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, maxlength: 255 },
  isDone: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

const ToDo = mongoose.model("ToDo", todoSchema);

const validateToDo = (todo) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(255),
    description: Joi.string().min(4).max(255),
    isDone: Joi.boolean().default(false),
  });

  return schema.validate(todo);
};

module.exports = {
  ToDo,
  validateToDo,
};
