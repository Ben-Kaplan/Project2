const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const morgan = require("morgan");
const passport = require("passport");
const restaurantController = require("./controllers/restaurant.js");
const userController = require("./controllers/user.js");
const authController = require("./controllers/auth.js");
require("dotenv").config();
require("./db/db");
require("./passport/serialize.js");
require("./passport/local-config.js");
require("./passport/google-config.js");


const methodOverride = require('method-override');

require('./db/db');



app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(session({
    secret: "tacosburritosandspaghetti",
    saveUninitialized: false
}));
app.use(morgan('short'));
app.use(passport.initialize());
app.use(passport.session());
app.use("/restaurants", restaurantController);
app.use("/users", userController);
app.use("/auth", authController);

app.get("/", (req, res) => {
    res.render("index.ejs");
});
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Howdy Cowboy");
});