const express = require("express");
const router = express.Router();
const { Task } = require("../../models/task");
const validateTask = require("../../middlewares/validateTask");
const auth = require("../../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    if (!tasks) return res.status(400).send("No tasks found!");
    return res.send(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong!");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(400).send("No task was found with given ID!");
    if (task.userId !== req.user._id)
      return res.status(401).send("You cannot access this task");
    return res.send(task);
  } catch (err) {
    return res.status(500).send("Something went wrong!");
  }
});

router.post("/", auth, validateTask, async (req, res) => {
  try {
    if (!req.body.title) return res.status(400).send("No title given");
    const task = new Task();
    task.title = req.body.title;
    task.userId = req.user._id;
    await task.save();
    return res.send(task);
  } catch (err) {
    return res.status(500).send("Something went wrong!");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(400).send("No task was found for given id!");
    if (task.userId != req.user._id)
      return res.status(401).send("You cannot update this task");
    if (req.body.title) task.title = req.body.title;
    task.isCompleted = req.body.isCompleted;
    await task.save();
    return res.send(task);
  } catch (err) {
    return res.status(500).send("Something went wrong!");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(400).send("No task was found for given id!");
    if (task.userId != req.user._id)
      return res.status(401).send("You cannot delete this task");
    await Task.findByIdAndRemove(req.params.id);
    return res.send(task);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong!");
  }
});

module.exports = router;
