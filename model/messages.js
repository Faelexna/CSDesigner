const mongoose = require('mongoose');

//Set up messages schema
let messageSchema = new mongoose.Schema({ mUser: String, message: String});
let Messages = mongoose.model('messages', messageSchema);

//Returns the last 30 messages in the collection
async function getMessageHistory() {
	return Messages.find({}).sort({_id: -1}).limit(30);
}

async function insertNewMessage( user, message ) {
	Messages.insertOne(
		{ mUser: user, message: message }
	);
}

//Export module
module.exports = {
	getMessageHistory,
	insertNewMessage
};
