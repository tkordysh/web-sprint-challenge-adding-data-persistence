// build your `Project` model here
const db = require("../../data/dbConfig");

function getProjects() {
  return db("projects");
}

async function postProjects(project) {
  const [project_id] = await db("projects").insert(project);
  return getProjects().where({ project_id }).first();
}

module.exports = {
  getProjects,
  postProjects,
};
