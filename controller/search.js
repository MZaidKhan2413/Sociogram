const Post = require("../models/posts.js");
const User = require("../models/users.js");

module.exports.renderSearchPage = async (req, res) => {
  let posts = await Post.find({}).sort({ _id: -1 }).populate("user_id");
  let user = await User.findById(res.locals.currentUser._id).populate(
    "following"
  );
  res.render("search/search-explore.ejs", { posts, user });
};

module.exports.foundUser = async (req, res) => {
  const username = req.query.username;
  let queryObject = {};
  if (username) {
    queryObject.username = { $regex: username, $options: "i" };
  }
  let searchedUsers = await User.find(queryObject);
  res.render("search/searched-user.ejs", { searchedUsers });
};
