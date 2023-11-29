const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/WrapAsync.js");
const User = require("../models/users.js");

router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    let user = req.body.user;
    let { username, email, password } = user;
    try {
      const newUser = new User({ email, username });
      const registerdedUser = await User.register(newUser, password);
      console.log(registerdedUser);

      req.login(registerdedUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Successfully Registered");
        res.redirect("/posts");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/signup");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    req.flash("success", "Welcome back to Sociogram");
    res.redirect("/posts");
  }
);

router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/");
  });
});

module.exports = router;
