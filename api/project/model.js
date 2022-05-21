// build your `Project` model here
const db = require("../../data/dbConfig");

const mapper = (project) => ({
  ...project,
  project_completed: Boolean(project.project_completed)
})

async function getProjects() {
  const projects = await db("projects")
  return projects.map(mapper)

}

async function postProjects(project) {
  const [project_id] = await db("projects").insert(project);
  const newProject = await db('projects').where({ project_id }).first();
  return mapper(newProject);
}

module.exports = {
  getProjects,
  postProjects,
};
