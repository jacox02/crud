const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require("../lib/auth");
router.get("/tasks/add", isLoggedIn, (req, res) => {
  res.render("tasks/add");
});

//ADD LINK
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

//VIEWS GETTERS

router.get("/tasks", isLoggedIn, async (req, res) => {
  const tasks = await pool.query("SELECT * FROM tasks WHERE user_id = ?", [
    req.user.id,
  ]);
  console.log(tasks);
  res.render("tasks/list", { tasks });
});

router.get("/tasks/add", isLoggedIn, (req, res) => {
  res.render("tasks/add");
});

router.get("/tasks/edit", isLoggedIn, (req, res) => {
  res.render("tasks/edit");
});
module.exports = router;
