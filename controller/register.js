const User = require("../models/users.js");

// Sign Up
module.exports.renderSignUp = (req, res) => {
  res.render("signup.ejs");
};

module.exports.SignUp = async (req, res) => {
  let user = req.body.user;
  let { username, email, full_name, password } = user;
  username = username.toLowerCase();
  try {
    const newUser = new User({ full_name, email, username });
    const registerdedUser = await User.register(newUser, password);
    console.log(registerdedUser);

    req.login(registerdedUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Successfully Registered");
      let REDIRECT_URL = res.locals.redirectURL || "/posts";
      res.redirect(REDIRECT_URL);
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/signup");
  }
};

// Login
module.exports.renderLogin = (req, res) => {
  res.render("login.ejs");
};

module.exports.Login = (req, res) => {
  req.flash("success", "Welcome back to Sociogram");
  res.redirect("/posts");
};

// Logout
module.exports.Logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out successfully!");
    res.redirect("/");
  });
};
