const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
const wrapAsync = require("../utils/WrapAsync.js");
const { isLoggedIn } = require("../utils/Middlewares.js");
const UserController = require("../controller/user.js");

// Show user profile
router.get("/:uid", wrapAsync(UserController.showUserProfile));

// edit user profile
router.get(
  "/:uid/edit",
  isLoggedIn,
  wrapAsync(UserController.renderEditUserPage)
);

router.put(
  "/:uid",
  upload.single("profile_pic"),
  wrapAsync(UserController.editUserProfile)
);

// Follow apis
// Follow a specific user
router.post("/follow/:uid", isLoggedIn, wrapAsync(UserController.followUser));
// Unfollow a specific user
router.put("/follow/:uid", isLoggedIn, wrapAsync(UserController.unfollowUser));

module.exports = router;
