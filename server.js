let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let http = require('http');
let socketIo = require('socket.io');
let {
	addUser,
	getCurrentUser,
	removeUser
} = require('./model/users');
let {
	getMessageHistory,
	insertNewMessage
} = require('./model/messages');

//Configure mongodb connection
let url = 'mongodb+srv://csduser:pass123@csdev.nsb90.mongodb.net/CSDev?retryWrites=true&w=majority';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(function() {
	console.log('mongodb connected')
}).catch(function(err) { console.log(err)});

//Configure app and server
let app = express();
let server = http.createServer(app);

//Set static folder
app.use(express.static(path.join(__dirname, 'src')));

//Configure socket.io
let io = socketIo(server);

io.on('connection', async function(socket) {
	let msgHistory = await getMessageHistory();
	socket.emit('loadHistory', msgHistory);

	socket.on('newUser', async function(username) {
		//Logic to connect user to chat
		await addUser(socket.id, username);

		//Notify chat
		socket.emit('appendMessage', ['chatbot', username+' has entered the chat']);
	});

	socket.on('newMessage', function(message) {
		//Logic to append new message to chat
		let user = getCurrentUser(socket.id);

		insertNewMessage(user.username, message);
		io.emit('appendMessage', [user.username, message]);
	});

	socket.on('disconnect', function() {
		//Logic to disconnect user from chat
		removeUser(socket.id);
	});
});


server.listen(9000, function() {
	console.log('Listening on port 9000');
})


