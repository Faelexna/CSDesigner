const mongoose = require('mongoose');

//Set up users schema
let userSchema = new mongoose.Schema({_id: String, username: String });
let Users = mongoose.model('users', userSchema);

//User enters the chat
async function addUser(id, username) {
	Users.insertOne(
		{ _id: id, username: username }
	);

	let user = { id: id, username: username };

	return user;
}

//Return the current user
async function getCurrentUser(id) {
	let user = Users.findOne({_id: id});

	return user;
}

//User leaves the chat
async function removeUser(id) {
	Users.findOneAndDelete({_id: id});
}

//Export module
module.exports = {
	Users,
	addUser,
	getCurrentUser,
	removeUser
};
