const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");

// register route
router.get('/', (req, res) => {
    let message = ""
    if(req.session.message){
        message = req.session.message
    }
    res.render('auth/index.ejs', {message: message})
});
router.post('/register', async (req, res) => {
    try {
        const createdUser = await User.create(req.body)
        res.redirect('/')
    } catch (err) {
        console.log(err)
        req.session.message = err.message
        res.redirect('/')
    }
});
// login route
router.post('/login', async (req, res) => {
    const userLoggingIn = await User.findOne({username: req.body.username})
    try {
    	if(!userTryingToLogIn){
        	req.session.message = "Invalid username or password";
        	res.redirect("/")
    	} else {
        	const validLogin = await bcrypt.compare(req.body.password, userLoggingIn.password)
        	if(!validLogin){
            	req.session.message = "Invalid username or password";
            	res.redirect("/")
        	} else {
            	res.redirect('/restaurants');
        	}
    	}
	} catch (err) {
		res.send(err);
	}
})


module.exports = router;