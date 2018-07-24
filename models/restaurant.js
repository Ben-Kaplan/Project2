const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restaurantSchema = new mongoose.Schema({
	name: {type: String, required: true}, 

	restaurantLocation: String,
	typeOfRestaurant: String,
	price: Number,
	comment: String,
	rating: Number,
	//dogFriendly: Boolean
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
