const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");


// register route
router.get('/', (req, res) => {
    console.log("reaching route")
    let message = ""
    if(req.session.message){
        message = req.session.message
    }
    res.render('auth/index.ejs', {message: message})
});
router.post('/register', async (req, res) => {
    try {
        console.log("posting to route")
        const createdUser = await User.create(req.body)
        console.log(createdUser);
        res.redirect('/');
    } catch (err) {
        console.log(err)
        req.session.message = err.message
    }
});
// login route
router.post('/login', async (req, res, next) => {
//     const userLoggingIn = await User.findOne({username: req.body.username})
//     try {
//     	if(!userLoggingIn){
//         	req.session.message = "Invalid username or password";
//         	res.redirect("/")
//     	} else {
//         	const validLogin = await bcrypt.compare(req.body.password, userLoggingIn.password)
//         	if(!validLogin){
//             	req.session.message = "Invalid username or password";
//             	res.redirect("/")
//         	} else {
//                 req.session.loggedIn = true;
//                 req.session.userId = userLoggingIn.id; 
//             	res.redirect('/restaurants');
//         	}
//     	}
// 	} catch (err) {
// 		res.send(err);
// 	}
const passportCallback = passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth'})
    passportCallback(req, res, next);
});
router.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/auth");
});
router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });


module.exports = router;