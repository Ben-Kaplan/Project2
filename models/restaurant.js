const mongoose = require('mongoose');

// const addressSchema = new mongoose.Schema({
// 	street: String, 
// 	city: String, 
// 	state: String, 
// 	zip: Number, 
// });

const restaurantSchema = new mongoose.Schema({
	name: {type: String, required: Boolean, unique: Boolean}, 
	restaurantLocation: String,
	typeOfRestaurant: String,
	price: Number,
	comment: String,
	rating: Number,
	dogFriendly: Boolean
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
