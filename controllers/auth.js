const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const User = require("../models/user");
=======
const User = require("#");
>>>>>>> 8df359a9b2014fc0c60c43a1bbd2eb46c77a8188
const bcrypt = require("bycrypt");

router.get("/auth", (req, res) => {
	res.render("auth/register.ejs", {
		message: req.session.message
	});
});
// register route
router.post("/register", async (req, res, next) => {
	const password = req.body.password;
	const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	const userDBEntry = {};
	uderDbEntry.username = req.body.username;
	userDbEntry.password = passwordHash;
	const user = await User.create(userDbEntry)
		try{
			console.log(user)
			req.session.username = user.username;
			req.session.loggedIn = true;
			res.redirect("/authors");
			} catch (err) {
				res.send(err);
			}
});
// login route
router.post("/register", (req, res) => {
	const user = User.findOne({username: req.body.username});
	try {
		if(user) {
			if(bcrypt.compareSync(req.body.password, user.password)) {
				req.session.message = "";
				req.session.username = req.body.username;
				req.session.loggedIn = true;
				res.redirect("/")
			} else {
				req.session.message = "Username or password incorrect."
				res.redirect("/register");
			}
		} else {
			req.session.message = "Username or password incorrect."
			res.redirect("/register");
		}
	} catch (err) {
		res.send(err);
	}
});
router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send("YOU CAN'T LOGOUT!!!!");
		} else {
			res.redirect("/register");
		}
	});
});



module.exports = router;