// build your `/api/projects` router here
const express = require("express");
const Project = require("../project/model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Project.getProjects()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Project.postProjects(req.body)
    .then((project) => {
      res.status(201).json(project);
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