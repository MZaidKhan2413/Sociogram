const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/WrapAsync.js");
const { saveRedirectURL } = require("../utils/Middlewares.js");
const RegisterController = require("../controller/register.js");

router.get("/signup", RegisterController.renderSignUp);

router.post(
  "/signup",
  saveRedirectURL,
  wrapAsync(RegisterController.SignUp)
);

router.get("/login", RegisterController.renderLogin);

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  RegisterController.Login
);

router.get("/logout", RegisterController.Logout);

module.exports = router;
