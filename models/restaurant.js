const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reviews = require("./reviews.js");
const restaurantSchema = new mongoose.Schema({
	name: String, 
	zipcode: String,
	restaurantLocation: String,
	typeOfRestaurant: String,
	price: String,
	comment: String,
	rating: Number,
	website: String,
	reviews: [Reviews.schema],
	url: String, 
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
