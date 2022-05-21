// build your `/api/resources` router here
const express = require("express");
const Resource = require("../resource/model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Resource.getResources()
    .then((resources) => {
      res.status(200).json(resources);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  Resource.postResources(req.body)
    .then((resource) => {
      res.status(201).json(resource);
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