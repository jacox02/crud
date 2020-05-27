const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.render("links/mainPage");
});

router.get("/home", (req, res) => {
  res.render("links/home");
});

module.exports = router;
