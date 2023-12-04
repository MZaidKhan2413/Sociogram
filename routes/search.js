const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const {isLoggedIn} = require("../utils/Middlewares.js");
const Post = require("../models/posts.js");
const User = require("../models/users.js");


router.get("/", isLoggedIn, wrapAsync( async (req, res)=>{
    let posts = await Post.find({}).sort({_id: -1}).populate("user_id");
    let user = await User.findById(res.locals.currentUser._id).populate("following");
    res.render("posts/search-explore.ejs", {posts, user});
}));


module.exports = router;