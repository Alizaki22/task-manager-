const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/tasks", async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/api/tasks", async (req, res) => {
  try {
    if (!req.body.title || req.body.title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;