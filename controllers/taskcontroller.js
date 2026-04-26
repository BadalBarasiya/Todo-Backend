const Task = require("../models/taskmodel");

// ✅ CREATE TASK
const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Write Task" });
    }

    const addTask = await Task.create({ title: title.trim(), userId: req.user.id });

    res.status(201).json(addTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ GET ALL TASKS
const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ _id: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ UPDATE TASK
const updateTask = async (req, res) => {
  try {
    const { id, title, completed } = req.body;

    const updateData = {};
    if (typeof title === "string") updateData.title = title.trim();
    if (typeof completed === "boolean") updateData.completed = completed;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updateData,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ DELETE TASK
const deleteTask = async (req, res) => {
  try {
    const { id } = req.body;

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};