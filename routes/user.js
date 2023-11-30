const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});
const User = require("../models/users.js");
const wrapAsync = require("../utils/WrapAsync.js");
const {isLoggedIn} = require("../utils/Middlewares.js");

// Show user profile
router.get("/:uid", wrapAsync( async (req, res) => {
  let uid = req.params.uid;
  let user = await User.findById(uid).populate({path: "posts", options: {sort: {_id: -1}}});
  res.render("posts/user-profile.ejs", { user });
}));

// edit user profile
router.get("/:uid/edit", isLoggedIn, wrapAsync( async (req, res)=>{
  let uid = req.params.uid;
  let user = await User.findById(uid);
  res.render("user/user-edit.ejs", {user});
}));
router.put("/:uid", upload.single("profile_pic"), wrapAsync( async (req, res)=>{
  let uid = req.params.uid;
  let bio = req.body.bio;
  let updatedUser = await User.findByIdAndUpdate(uid, {bio});
  if (typeof req.file !== "undefined") {
    let profile_pic = req.file.path;
    updatedUser.profile_pic = {profile_pic};
    await updatedUser.save();
  }
  req.flash('success', "Profile updated successfully");
  res.redirect(`/user/${uid}`);
}));

// show a specific post of user
router.get("/:uid/posts/:id", wrapAsync( async (req, res)=>{
  let {uid, id} = req.params;
  let user = await User.findById(uid).populate({path: "posts", options: {sort: {_id: -1}}});
  res.render("posts/show.ejs", {id, user});
}));

module.exports = router;
