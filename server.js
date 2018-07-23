const express = require("express");
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const port = 3000;
const restaurantController = require("./controllers/restaurant.js");
const userController = require("./controllers/user.js");
const authController = require("./controllers/auth.js");
require('./db/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: "tacosburritosandspaghetti",
    saveUninitialized: false
}))
app.use(morgan('short'));
app.use("/restaurants", restaurantController);
app.use("/users", userController);
app.use("/auth", authController);

app.get("/", (req, res) => {
	res.render("index.ejs")
});

app.listen(port, () => {
	console.log("Howdy Cowboy");
});