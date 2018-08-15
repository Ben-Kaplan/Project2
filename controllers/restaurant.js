const express = require("express");
const router  = express.Router();
const User = require("../models/user.js");
const Restaurant = require("../models/restaurant");
const Reviews = require("../models/reviews.js");
// index route
router.get("/", async (req, res) => {
  try {
    if (req.query.name || req.query.zipcode ) {
      const regex = new RegExp(escapeRegex(req.query.name), "gi");
      const zipregex = new RegExp(escapeRegex(req.query.zipcode), "g");
      const foundRestaurants = await Restaurant.find({name: regex, zipcode: zipregex});
      res.render('restaurant/index.ejs', {
        restaurants: foundRestaurants,});
    } else {
      const foundRestaurants = await Restaurant.find({});
        res.render('restaurant/index.ejs', {
        restaurants: foundRestaurants,
      });
    }
    
  } catch (err) {
    res.send(err);
  }
});
// new route
router.get("/new", (req, res) => {
  if (req.session.loggedIn == true) {
      res.render('restaurant/new.ejs');
  } else {
      console.log("cannot show content")
      res.redirect("/auth");
  }

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
    if (req.session.loggedIn == true) {
      const foundRestaurant = await Restaurant.findById(req.params.id);
      res.render("restaurant/edit.ejs", {restaurant: foundRestaurant});
    } else {
      res.redirect("/auth");
    }
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
// router.post("/:id/like", async (req, res) => {
//   try {
//     if (req.session.loggedIn == true) {
//       await req.user.likedRestaurants.push(req.params.id);
//       await req.user.save();
//       res.redirect("/");
//     } else {
//       res.redirect("/auth");
//     }
//   } catch (err) {
//     res.send(err);
//   }
// });
// review route
router.post("/:id/review", async (req, res) => {
  try {
      const createdReview = await Reviews.create(req.body);
      console.log(createdReview);
      const currentRestaurant = await Restaurant.findById(req.params.id);
      console.log(currentRestaurant);
      currentRestaurant.reviews.push(createdReview);
      await currentRestaurant.save();
      console.log(Restaurant.reviews)
      res.redirect(`/restaurants/${req.params.id}`);

    
  } catch (err) {
    res.send(err);
  }
  
});
// delete route
router.delete('/:id', async (req, res) => {
  try {
    if (req.session.loggedIn == true) {
      const deletedRestaurant = await Restaurant.findByIdAndRemove(req.params.id);
      res.redirect("/restaurants");
    } else {
      res.redirect("/auth");
    }
  } catch (err) {
    res.send(err);
  }
});
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};



module.exports = router;
