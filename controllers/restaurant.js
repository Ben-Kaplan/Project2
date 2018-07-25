const express = require('express');
const router  = express.Router();
const Restaurant = require('../models/restaurant');
// index route
router.get("/", async (req, res) => {
  try {
    const data = await User.find({}).populate('Restaurant');
    const foundRestaurants = await Restaurant.find({});
    res.render('restaurant/index.ejs', {
        restaurants: foundRestaurants,
        "users": data
      });
  } catch (err) {
    res.send(err);
  }
});
// new route
router.get("/new", (req, res) => {
  res.render('restaurant/new.ejs');
});
// show route
router.get("/:id", async (req, res) => {
  try {
    const foundRestaurant = await Restaurant.findById(req.params.id);
    res.render("restaurant/show.ejs", {restaurant: foundRestaurant});
  } catch (err) {
    res.send(err);
  }
});
// edit route
router.get("/:id/edit", async (req, res) => {
  try {
    const foundRestaurant = await Restaurant.findById(req.params.id);
    res.render("restaurant/edit.ejs", {restaurant: foundRestaurant});
  } catch (err) {
    res.send(err);
  }
});
// edit put route
router.put("/:id", async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect("/restaurants");
  } catch (err) {
    res.send(err);
  }
});
// new post route
router.post("/", async (req, res) => {
  try {
    const createdRestaurant = await Restaurant.create(req.body)
    res.redirect('/restaurants');
  } catch (err) {
    res.send(err);
  }

});
// like route
router.post("/:id/like", async (req, res) => {
  try {
    console.log(req.user);
    await req.user.likedRestaurants.push(req.params.id);
    await req.user.save();
    res.redirect("/restaurants");
  } catch (err) {
    res.send(err);
  }
});
// comment route
router.post("/comment", async (req, res) => {
  const userPost = await Restaurant.findOne(req.body.name);
});
// delete route
router.delete('/:id', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
    res.redirect("/restaurants");
  } catch (err) {
    res.send(err);
  }
});



module.exports = router;
