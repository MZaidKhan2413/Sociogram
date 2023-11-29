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

const Post = mongoose.model("Post", postSchema);
module.exports = Post;