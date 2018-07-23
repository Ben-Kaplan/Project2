const mongoose = require('mongoose');

const Restaurant = require ('./restaurant')
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	email: String,
	userLocation: String,
	profile: ({name: String, animalName: String, bio: String}),
	review: String,
	

	restaurants: {type: [Restaurant.schema], default: void 0}

});

const User = mongoose.model('User', UserSchema);
UserSchema.pre('save', async function(next){
    const existingUser = await User.findOne({username: this.username})
    if(!existingUser){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});


module.exports = User;

