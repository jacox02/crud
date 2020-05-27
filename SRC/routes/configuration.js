const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");
const router = express.Router();

router.get("/config", isNotLoggedIn, (req, res) => {
  res.render("auth/signup");
});

router.get("/forgot", isNotLoggedIn, (req, res) => {
  res.render("auth/resetPassword");
});

router.get("/changePass", isLoggedIn, (req, res) => {
  res.render("auth/changePassword");
});

module.exports = router;
