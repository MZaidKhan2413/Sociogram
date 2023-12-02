const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage});
const Post = require("../models/posts");
const User = require("../models/users.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/WrapAsync.js");
const {postSchema} = require("../utils/schemaValidation.js");
const { isLoggedIn } = require("../utils/Middlewares.js");

const validatePost = (req, res, next) => {
    let {error} = postSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}


//  Routes
// index page
router.get("",isLoggedIn, async (req, res)=>{
    let posts = await Post.find({}).populate("user_id").sort({_id: -1});
    res.render("posts/index.ejs", {posts});
});

// new post
router.post("/new", isLoggedIn, upload.single('post[image]'), validatePost, wrapAsync(async (req, res)=>{
    let file = req.file;
    let post = req.body.post;
    if (typeof file === "undefined" || !post) {
        throw new ExpressError(500, "Bad Request!")
    }
    let newPost = new Post({image: file.path, caption: post.caption, user_id: res.locals.currentUser._id});
    let user = await User.findById(res.locals.currentUser._id);
    user.posts.push(newPost);
    await newPost.save();
    await user.save();
    res.redirect("/posts");
}));

// edit post
router.get("/:id/edit", isLoggedIn, wrapAsync( async (req, res)=>{
    let id = req.params.id;
    let post = await Post.findById(id);
    res.render("posts/post-edit.ejs", {post});
}));
router.put("/:id", wrapAsync( async (req, res)=>{
    let id = req.params.id;
    let caption = req.body.caption;
    let editedPost = await Post.findById(id);
    editedPost.caption = caption;
    await editedPost.save();
    res.redirect(`/user/${res.locals.currentUser._id}`);
}))

// delete post
router.delete("/:id", isLoggedIn, async (req, res)=>{
    let userId = res.locals.currentUser._id;
    let id = req.params.id;
    await User.findByIdAndUpdate(userId, {$pull: {posts: id}});
    let deletedPost = await Post.findByIdAndDelete(id);
    console.log(deletedPost);
    res.redirect("/posts")
});

module.exports = router;