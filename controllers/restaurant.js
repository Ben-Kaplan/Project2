const express = require('express');
const router  = express.Router();
const Restaurant = require('../models/restaurant');
// index route
router.get("/", async (req, res) => {
  try {
    const foundRestaurants = await Restaunt.find({});
    res.render('restaurant/index.ejs', {
        restaurants: foundRestaurants
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
    const foundRestaurant = await Restaunt.findById(req.params.id);
    res.render("restaurant/show.ejs", {restaurant: foundRestaurant});
  } catch (err) {
    res. send(err);
  }
});
// edit route
router.get("/:id/edit", async (req, res) => {
  try {
    const foundRestaurant = await Restaunt.findById(req.params.id);
    res.render("restaurant/edit.ejs", {restaurant: foundRestaurant});
  } catch (err) {
    res.send(err);
  }
});
// put route
router.put('/:id', async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect("/restaurants");
  } catch (err) {
    res.send(err);
  }
});
// post route
router.post('/', async (req, res) => {
  try {
    const createdRestaurant = await Restaunt.create(req.body)
    res.redirect('/restaurants');
  } catch (err) {
    res.send(err);
  }

});
// delete route
router.delete('/:id', async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
    res.redirect(".restaurants");
  } catch (err) {
    res.send(err);
  }
});



module.exports = router;
