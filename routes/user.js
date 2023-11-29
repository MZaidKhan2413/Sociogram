const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const Post = require("../models/posts");
const wrapAsync = require("../utils/WrapAsync.js");


router.get("/user/:id", wrapAsync( async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id).populate({path: "posts", sort: {_id: -1}});
  res.render("posts/user-profile.ejs", { user });
}));

module.exports = router;
