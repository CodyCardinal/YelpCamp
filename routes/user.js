const { storeReturnTo } = require("../middleware");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const errorSync = require("../utils/errorSync");
const users = require("../controllers/users");

router.get("/register", users.renderRegister);
router.post("/register", errorSync(users.register));
router.get("/login", users.renderLogin);
router.post("/login", storeReturnTo, passport.authenticate("local", { failureFlash: true, failureRedirect: "/login"}), users.login);
router.get("/logout", users.logout);

module.exports = router;
