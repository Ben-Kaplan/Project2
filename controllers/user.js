const express = require('express');
const router  = express.Router();
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
router.get("/", async (req, res) => {
  try {
    const foundUsers = await User.find({});
    res.render('user/index.ejs', {
        users: foundUsers
      });
  } catch (err) {
    res.send(err);
  }
});
// new route
router.get("/new", (req, res) => {
  res.render('user/new.ejs');
});
// show route
router.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.render("user/show.ejs", {user: foundUser});
  } catch (err) {
    res. send(err);
  }
});
// edit route
router.get("/:id/edit", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.render("user/edit.ejs", {user: foundUser});
  } catch (err) {
    res.send(err);
  }
});
// put route
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});
// post route
router.post('/', async (req, res) => {
  try {
    const createdUser = await User.create(req.body)
    res.redirect('/users');
  } catch (err) {
    res.send(err);
  }

});

// delete route
router.delete('/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndRemove(req.params.id)
    try {
    const userIds = [];
    for(let i = 0; i < deletedUser.restaurants.length; i++){
      restaurantIds.push(deletedUser.restaurants[i].id);
    }
      await Restaurant.remove({_id: { $in: userIds}});
        res.redirect('/users')
    } catch (err) {
      res.send(err);
    }
});



module.exports = router;
