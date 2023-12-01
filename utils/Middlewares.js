module.exports.isLoggedIn = (req, res, next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectURL = req.originalURL;
        req.flash('error', "You must be logged in!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectURL = (req, res, next)=>{
    if(req.session.redirectURL) {
        res.locals.redirectURL = req.session.redirectURL;
    }
    next();
}