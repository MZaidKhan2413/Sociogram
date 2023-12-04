const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    image: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
    likes: Number,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

// postSchema.post("findOneAndDelete", async(post)=>{
//     if(post) {
//         await Post.deleteMany({_id: {$in: post.user_id}});
//     }
// });

const Post = mongoose.model("Post", postSchema);
module.exports = Post;