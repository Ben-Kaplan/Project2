const mongoose = require('mongoose');
const reviewsSchema = new mongoose.Schema({
	rating: Number,
	body: String,
});

module.exports = mongoose.model('Reviews', reviewsSchema);
