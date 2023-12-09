const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const {isLoggedIn} = require("../utils/Middlewares.js");
const SearchController = require("../controller/search.js");

router.get("/", isLoggedIn, wrapAsync(SearchController.renderSearchPage));

router.get("/query", wrapAsync(SearchController.foundUser));

module.exports = router;