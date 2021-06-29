const express = require('express');
const cors = require('cors');
const app = express();
const passport = require("passport");
/* const passportLocal = require("passport-local").Strategy; */
const cookieParser = require("cookie-parser");
/* const bcrypt = require("bcryptjs"); */
const session = require("express-session");

app.use(express.json());
app.use(express.urlencoded());

// TODO: configure cors
app.use(cors());

app.use(
    session({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
