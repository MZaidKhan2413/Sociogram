const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const User = require("../models/users.js");
const Post = require("../models/posts.js");
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn } = require("../utils/Middlewares.js");

// Show user profile
router.get(
  "/:uid",
  wrapAsync(async (req, res) => {
    let uid = req.params.uid;
    let user = await User.findById(uid)
      .populate({ path: "posts", options: { sort: { _id: -1 } } })
      .populate("following")
      .populate("followers");
    res.render("user/user-profile.ejs", { user });
  })
);

// edit user profile
router.get(
  "/:uid/edit",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let uid = req.params.uid;
    let user = await User.findById(uid);
    res.render("user/user-edit.ejs", { user });
  })
);
router.put(
  "/:uid",
  upload.single("profile_pic"),
  wrapAsync(async (req, res) => {
    let uid = req.params.uid;
    let { bio, full_name } = req.body;
    let updatedUser = await User.findByIdAndUpdate(uid, { bio, full_name });
    if (typeof req.file !== "undefined") {
      let profile_pic = req.file.path;
      updatedUser.profile_pic = profile_pic;
      await updatedUser.save();
    }
    req.flash("success", "Profile updated successfully");
    res.redirect(`/user/${uid}`);
  })
);


// Follow apis
// Follow a specific user
router.post(
  "/follow/:uid",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let uid = req.params.uid;
    let currentUser = res.locals.currentUser;
    let followedUser = await User.findById(uid);
    currentUser.following.push(followedUser);
    followedUser.followers.push(currentUser);
    await currentUser.save();
    await followedUser.save();
    res.redirect(`/user/${uid}`);
  })
);
// Unfollow a specific user
router.put(
  "/follow/:uid",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    let uid = req.params.uid;
    let currentUser = res.locals.currentUser;
    await User.findByIdAndUpdate(uid, {
      $pull: { followers: currentUser._id },
    });
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: uid },
    });
    res.redirect(`/user/${uid}`);
  })
);

module.exports = router;
