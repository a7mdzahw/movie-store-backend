const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, required: true },
  description: { type: String, maxlength: 255 },
  isDone: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now },
});

const ToDo = mongoose.model("ToDo", todoSchema);

const validateToDo = (todo) => {
  const schema = Joi.object({
    title: Joi.string().required().min(4).max(255),
    userId: Joi.objectId().required(),
    description: Joi.string().min(4).max(255),
    isDone: Joi.boolean().default(false),
  });

  return schema.validate(todo);
};

module.exports = {
  ToDo,
  validateToDo,
};
