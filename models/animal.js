const mongoose = require('mongoose');

var AnimalSchema = new mongoose.Schema({
	name: String,
	type: String,
	age: Number,
	sex: String,
	fixed: Boolean,
	bio: String,
	available: Boolean,
	picture: String,
	shots: Array
});

const Animal = mongoose.model('Animal', AnimalSchema);

module.exports = Animal;