const mongoose = require('mongoose');
const Restaurant = require ('./models/restaurant')

const userSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	userLocation: String,
	profile: ({name: String, animalName: String; bio: String}),
	review: String,
	
	restaurant: [restaurantSchema]
});

module.exports = mongoose.model('User', userSchema);
