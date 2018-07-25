const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Reviews = require("./reviews.js");
const restaurantSchema = new mongoose.Schema({
	name: {type: String, required: true}, 
	restaurantLocation: String,
	typeOfRestaurant: String,
	price: Number,
	comment: String,
	rating: Number,
	website: String,
	//dogFriendly: Boolean
	reviews: [Reviews.schema],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
