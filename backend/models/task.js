const mongoose = require("mongoose");
const Joi = require("joi");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    title: {
      type: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

function validateTask(data) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    isCompleted: Joi.boolean(),
  });
  return schema.validate(data, { abortEarly: false });
}

const Task = mongoose.model("Task", taskSchema);
module.exports.Task = Task;
module.exports.validate = validateTask;
