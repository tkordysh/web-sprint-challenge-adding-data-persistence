// build your `Task` model here
const db = require("../../data/dbConfig");

const mapper = (task) => ({
  ...task,
  task_completed: Boolean(task.task_completed),
});

async function getTasks() {
  const tasks = await db("tasks as t")
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .select(
      "t.task_id",
      "t.task_description",
      "t.task_notes",
      "t.task_completed",
      "p.project_name",
      "p.project_description"
    );

  return tasks.map(mapper);
}

async function postTasks(task) {
  const [task_id] = await db("tasks").insert(task);
  const newTask = await db("tasks").where({ task_id }).first();
  return mapper(newTask);
}

module.exports = {
  getTasks,
  postTasks,
};
