if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;

const methodOverride = require("method-override");
const path = require("path");
const engine = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/users.js");
const ExpressError = require("./utils/ExpressError.js");
const postRouter = require("./routes/posts.js");
const userRouter = require("./routes/user.js");
const registerRouter = require("./routes/register.js");
const serachRouter = require("./routes/search.js");

// DB Connection
const mongoose = require("mongoose");
const MONGO_URL = process.env.ATLAS_URL;
main()
    .then(()=>{
        console.log("Connection to DB Succeed");
    }).catch((err)=>{
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
};


const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600,
})

// Express Session
const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true, 
    },
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
app.use("/search", serachRouter);
app.use("/", registerRouter);


// Error Handeler
app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not found!"));
})

app.use((err, req, res, next)=>{
    let {statusCode = 500, message = "Something went wrong!"} = err;
    res.status(statusCode).send(message);
});

server.listen(port, ()=>{
    console.log("App Listening at port: "+port);
});