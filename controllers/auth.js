const express = require("express");
const router = express.Router();
const User = require("#");
const bcrypt = require("bycrypt");

router.get("/", (req, res) => {
	res.render("auth/register.ejs", {
		message: req.session.message
	});
});
// router.post("/register", (req, res, next) => {
// 	const password = req.body
// });
router.post("/login", (req, res) => {
	console.log(req.session);
	req.session.loggedIn = true;
	req.session.username = req.body.username;
	res.redirect("/");
});
router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send("YOU CAN'T LOGOUT!!!!");
		} else {
			res.redirect("/auth");
		}
	});
});



module.exports = router;