const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comments.js");

const postSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        },
    ],
});

postSchema.post("findOneAndDelete", async(post)=>{
    if(post) {
        await Comment.deleteMany({_id: {$in: post.comments}});
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;