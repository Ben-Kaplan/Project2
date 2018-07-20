const express = require("express");
const router = express.Router();
const User = require("#");

router.get("/", (req, res) => {
	res.render("auth/login.ejs", {
		message: req.session.message
	});
});
router.post("/login", (req, res) => {
	console.log(req.session);
	req.session.loggedIn = true;
	req.session.username = req.body.username;
	res.redirect("/articles")
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