if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const port = 3000;

const methodOverride = require("method-override");
const path = require("path");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/users.js");
const ExpressError = require("./utils/ExpressError.js");
const postRouter = require("./routes/posts.js");
const userRouter = require("./routes/user.js");
const registerRouter = require("./routes/register.js");

// DB Connection
const mongoose = require("mongoose");
main()
    .then(()=>{
        console.log("Connection to DB Succeed");
    }).catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/sociogram");
};

// Express Session
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

// Middlewares & Setting Environment
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get("/", (req, res)=>{
    res.render("home.ejs");
});

app.use("/posts", postRouter);
app.use("/user", userRouter);
app.use("/", registerRouter);

// Error Handeler
app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not found!"));
})

app.use((err, req, res, next)=>{
    let {statusCode = 500, message = "Something went wrong!"} = err;
    res.status(statusCode).send(message);
});

app.listen(port, ()=>{
    console.log("App Listening at port: "+port);
});