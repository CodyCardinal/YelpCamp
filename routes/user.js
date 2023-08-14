const express = require("express");
const router = express.Router();
const passport = require("passport");
const errorSync = require("../utils/errorSync");
const users = require("../controllers/users");

router.route("/register")
    .get(users.renderRegister)
    .post(errorSync(users.register));

router.route("/login")
    .get(users.renderLogin)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), users.login);

router.get("/logout", users.logout);

module.exports = router;
