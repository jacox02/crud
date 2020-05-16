const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");
router.get("/tasks/add", isLoggedIn, (req, res) => {
  res.render("tasks/add");
});

//VIEWS GETTERS

router.get("/tasks", isLoggedIn, async (req, res) => {
  const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [
    req.user.id,
  ]);
  res.render("tasks/list", { tasks });
});

router.get("/tasks/add", isLoggedIn, (req, res) => {
  res.render("tasks/add");
});

router.get("/tasks/edit", isLoggedIn, (req, res) => {
  res.render("tasks/edit");
});

//ADD TASK
router.post("/tasks/add", isLoggedIn, async (req, res) => {
  const { tittle, assignment, delivery_date, description } = req.body;
  const newTask = {
    tittle,
    assignment,
    delivery_date,
    description,
    user_id: req.user.id,
  };
  await pool.query("INSERT INTO tasks set?", [newTask]);
  req.flash("success", "Tarea agregada correctamente");
  res.redirect("/tasks");
});

//DELETE TASK
router.get("/tasks/delete/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
  req.flash("succes", "Tarea borrada correctamente");
  res.redirect("/tasks");
});

//EDITE TASK

router.get("/tasks/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const tasks = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
  res.render("tasks/edit", { tasks: tasks[0] });
});

router.post("/tasks/edit/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;
  const { tittle, assignment, delivery_date, description } = req.body;
  const newTask = {
    tittle,
    assignment,
    description,
    delivery_date,
    user_id: req.user.id,
  };
  await pool.query("UPDATE tasks set ? WHERE id = ?", [newTask, id]);
  req.flash("success", "Link editado correctamente");
  res.redirect("/tasks");
});

module.exports = router;
