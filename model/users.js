const mongoose = require('mongoose');

//Set up users schema
let userSchema = new mongoose.Schema({_id: String, username: String });
let Users = mongoose.model('users', userSchema);

//User enters the chat
async function addUser(id, username) {
	Users.findOneAndUpdate(
		{ _id : id},
		{$set: { username : username } },
		{ upsert : true }
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
	addUser,
	getCurrentUser,
	removeUser
};
