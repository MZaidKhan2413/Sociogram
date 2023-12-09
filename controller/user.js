const User = require("../models/users.js");

// User Profile Route
module.exports.showUserProfile = async (req, res) => {
  let uid = req.params.uid;
  let user = await User.findById(uid)
    .populate({ path: "posts", options: { sort: { _id: -1 } } })
    .populate("following")
    .populate("followers");
  res.render("user/user-profile.ejs", { user });
};

// Edit User Profile
module.exports.renderEditUserPage = async (req, res) => {
  let uid = req.params.uid;
  let user = await User.findById(uid);
  res.render("user/user-edit.ejs", { user });
};

module.exports.editUserProfile = async (req, res) => {
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
};

// Follow Routes
module.exports.followUser = async (req, res) => {
  let uid = req.params.uid;
  let currentUser = res.locals.currentUser;
  let followedUser = await User.findById(uid);
  currentUser.following.push(followedUser);
  followedUser.followers.push(currentUser);
  await currentUser.save();
  await followedUser.save();
  res.redirect(`/user/${uid}`);
};

module.exports.unfollowUser = async (req, res) => {
  let uid = req.params.uid;
  let currentUser = res.locals.currentUser;
  await User.findByIdAndUpdate(uid, {
    $pull: { followers: currentUser._id },
  });
  await User.findByIdAndUpdate(currentUser._id, {
    $pull: { following: uid },
  });
  res.redirect(`/user/${uid}`);
};
