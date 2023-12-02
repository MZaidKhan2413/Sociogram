const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Post = require("./posts");


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    full_name: String,
    profile_pic: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg",
    },
    bio : {
        type: String,
        max: 30,
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

userSchema.plugin(passportLocalMongoose);

userSchema.post("findOneAndDelete", async(post)=>{
    if(post) {
        await Post.deleteMany({_id: {$in: post.user_id}});
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;