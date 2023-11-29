const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
const wrapAsync = require("../utils/WrapAsync.js");

// Show user profile
router.get("/:uid", wrapAsync( async (req, res) => {
  let uid = req.params.uid;
  let user = await User.findById(uid).populate({path: "posts", options: {sort: {_id: -1}}});
  res.render("posts/user-profile.ejs", { user });
}));

// show a specific post of user
router.get("/:uid/posts/:id", wrapAsync( async (req, res)=>{
  let {uid, id} = req.params;
  let user = await User.findById(uid).populate({path: "posts", options: {sort: {_id: -1}}});
  res.render("posts/show.ejs", {id, user});
}));

module.exports = router;
