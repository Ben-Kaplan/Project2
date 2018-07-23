const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
	name: {type: String, required: true, unique: true}, 
	restaurantLocation: {street: String, city: String, state: String, zip: Number, required: true},
	typeOfRestaurant: String,
	price: Number,
	comment: String,
	rating: Number,
	dog-friendly: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
