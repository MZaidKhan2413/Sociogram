const Post = require("../models/posts");
const User = require("../models/users.js");
const Comment = require("../models/comments.js");

// index route
module.exports.index = async (req, res) => {
  let currentUser = res.locals.currentUser;
  let posts = await Post.find({
    $or: [
      { user_id: { $in: currentUser.following } },
      { user_id: currentUser._id },
    ],
  })
    .populate({
      path: "user_id",
      model: "User"
    })
    .sort({ _id: -1 });
  let user = await User.findById(currentUser._id).populate("following");
  res.render("posts/index.ejs", { posts, user });
};


// New Post Route
module.exports.newPost = async (req, res) => {
  let file = req.file;
  let post = req.body.post;
  if (typeof file === "undefined" || !post) {
    throw new ExpressError(500, "Bad Request!");
  }
  let newPost = new Post({
    image: file.path,
    caption: post.caption,
    user_id: res.locals.currentUser._id,
  });
  let user = await User.findById(res.locals.currentUser._id);
  user.posts.push(newPost);
  await newPost.save();
  await user.save();
  res.redirect("/posts");
};


// Show Post Route
module.exports.showPost = async (req, res) => {
  let id = req.params.id;
  let post = await Post.findById(id)
    .populate("user_id")
    .populate({
      path: "comments",
      populate: { path: "author" },
      options: { sort: { _id: -1 } },
    });
  let user = await User.findById(res.locals.currentUser).populate("following");
  res.render("posts/show.ejs", { user, post });
};


// Edit Post Route
module.exports.renderEditPost = async (req, res) => {
  let id = req.params.id;
  let post = await Post.findById(id);
  res.render("posts/post-edit.ejs", { post });
};

module.exports.editPost = async (req, res) => {
  let id = req.params.id;
  let caption = req.body.caption;
  let editedPost = await Post.findById(id);
  editedPost.caption = caption;
  await editedPost.save();
  res.redirect(`/posts/${id}`);
};


// Delete Post Route
module.exports.destroyPost = async (req, res) => {
  let userId = res.locals.currentUser._id;
  let id = req.params.id;
  await User.findByIdAndUpdate(userId, { $pull: { posts: id } });
  let deletedPost = await Post.findByIdAndDelete(id);
  console.log(deletedPost);
  res.redirect(`/user/${userId}`);
};


// Like Route
module.exports.likePost = async (req, res) => {
  let id = req.params.id;
  let uid = res.locals.currentUser._id;
  let post = await Post.findById(id);
  if (post.likes.includes(uid)) {
    await Post.findByIdAndUpdate(id, { $pull: { likes: uid } });
  } else {
    await Post.findByIdAndUpdate(id, { $push: { likes: uid } });
  }

  res.redirect(`/posts#p-${id}`);
};


// Comment Route
module.exports.addComment = async (req, res) => {
  let id = req.params.id;
  let post = await Post.findById(id);

  let newComment = new Comment({
    comment: req.body.comment,
    author: res.locals.currentUser._id,
  });
  post.comments.push(newComment);
  await newComment.save();
  await post.save();
  let redirect = `/posts/${id}`;
  res.redirect(redirect);
};
