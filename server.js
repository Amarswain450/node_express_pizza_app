require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const passport = require('passport');

//config database
const connect = require('./db');
connect();

//config body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: 'sessions'
    }) ,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

//passport config
const init = require('./passport/passport');
init(passport);
app.use(passport.initialize());
app.use(passport.session());

//session-flash config
app.use(flash());

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

//config static files
app.use(express.static(path.join(__dirname, "./public")));

//setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./views"));

//config router
const router = require('./routes/web');
app.use(router);


app.listen(PORT, () => {
    console.log(`server running on port number ${PORT}`);
});