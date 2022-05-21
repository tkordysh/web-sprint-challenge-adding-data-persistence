// build your `/api/tasks` router here
const express = require("express");
const Task = require("../task/model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Task.getTasks()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Task.postTasks(req.body)
    .then((task) => {
      res.status(201).json(task);
    })
    .catch(next);
});

//err handling md
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;