const express = require("express");
const router = express.Router();
const pool = require("../database");

//Añadir link a DB
router.get("/add", (req, res) => {
  res.render("links/add");
});

router.post("/add", async (req, res) => {
  const { tittle, url, description } = req.body;
  const newLink = {
    tittle,
    url,
    description,
  };
  await pool.query("INSERT INTO links set ?", [newLink]);
  req.flash("success", "Link guardado correctamente");
  res.redirect("/links");
});

//Imprimir los links en pantalla
router.get("/", async (req, res) => {
  const links = await pool.query("SELECT * FROM links");
  res.render("links/list", { links });
});

//Delete links
router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM links WHERE id = ?", [id]);
  req.flash("success", "Link borrado correctamente");
  res.redirect("/links");
});
//Edit links

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
  res.render("links/edit", { link: links[0] });
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { tittle, url, description } = req.body;
  const newLink = {
    tittle,
    url,
    description,
  };
  await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
  req.flash("success", "Link editado correctamente");
  res.redirect("/links");
});

router.get("/index", (req, res) => {
  res.render("links/main");
});
module.exports = router;
