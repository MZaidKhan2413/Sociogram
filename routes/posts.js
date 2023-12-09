const express = require("express");
const router = express.Router();

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/WrapAsync.js");
const { postSchema } = require("../utils/schemaValidation.js");
const { isLoggedIn } = require("../utils/Middlewares.js");

const PostController = require("../controller/posts.js");

const validatePost = (req, res, next) => {
  let { error } = postSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//  Routes
// index page
router.get("/", isLoggedIn, wrapAsync(PostController.index));

// new post
router.post(
  "/new",
  isLoggedIn,
  upload.single("post[image]"),
  validatePost,
  wrapAsync(PostController.newPost)
);

// show post
router.get("/:id", isLoggedIn, wrapAsync(PostController.showPost));

// edit post
router.get("/:id/edit", isLoggedIn, wrapAsync(PostController.renderEditPost));
router.put("/:id", wrapAsync(PostController.editPost));

// delete post
router.delete("/:id", isLoggedIn, wrapAsync(PostController.destroyPost));

// Like
router.post("/:id/like", isLoggedIn, wrapAsync(PostController.likePost));

// Comments
router.post("/:id/comments", isLoggedIn, wrapAsync(PostController.addComment));

module.exports = router;
