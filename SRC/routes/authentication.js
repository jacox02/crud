const express = require("express");
const router = express.Router();
const passport = require("passport");
//REGISTRO -Muestra de formulario
router.get("/signup", async (req, res) => {
  res.render("auth/signup");
});

//Registro -OBTENCION DE DATOS
router.post("/signup", (req, res) => {
  console.log(req.body);
  res.send("received");
});

module.exports = router;
