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
router.get("/posts",isLoggedIn, async (req, res)=>{
    let posts = await Post.find({}).populate("user_id").sort({_id: -1});
    res.render("posts/home.ejs", {posts});
});

// new
router.post("/posts/new", upload.single('post[image]'), validatePost, wrapAsync(async (req, res)=>{
    let file = req.file;
    let post = req.body.post;
    if (typeof file === "undefined" || !post) {
        throw new ExpressError(500, "Bad Request!")
    }
    let newPost = new Post({image: file.path, caption: post.caption, user_id: req.user._id});
    let user = await User.findById(req.user._id);
    user.posts.push(newPost);
    await newPost.save();
    await user.save();
    res.redirect("/posts");
}));

// show
router.get("/user/:uid/posts/:id", wrapAsync( async (req, res)=>{
    let {uid, id} = req.params;
    let user = await User.findById(uid).populate({path: "posts", sort: {_id: -1}});
    res.render("posts/show.ejs", {id, user});
}));

// edit
router.get("/posts/:id/edit", wrapAsync( async (req, res)=>{
    res.send("Edit Page");
}));

router.delete("/posts/:id", async (req, res)=>{
    let userId = req.user._id;
    let id = req.params.id;
    await User.findByIdAndUpdate(userId, {$pull: {posts: id}});
    let deletedPost = await Post.findByIdAndDelete(id);
    console.log(deletedPost);
    res.redirect("/posts")
});

module.exports = router;