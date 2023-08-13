const { storeReturnTo } = require("../middleware");
const express = require("express");
const router = express.Router();
const passport = require("passport");
const errorSync = require("../utils/errorSync");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("users/register");
});
router.post(
  "/register",
  errorSync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        // Log the user in after they register, instead of register into login.
        if (err) return next(err);
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login");
});

router.post(
  "/login",
  // use the storeReturnTo middleware to save the returnTo value from session to res.locals
  storeReturnTo,
  // passport.authenticate logs the user in and clears req.session
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  // Now we can use res.locals.returnTo to redirect the user after login
  (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    delete req.session.returnTo; // update this line to use res.locals.returnTo now
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
});
module.exports = router;