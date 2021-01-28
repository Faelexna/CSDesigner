const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const {
	Users,
	addUser,
	getCurrentUser,
	removeUser
} = require('/model/users');
const {
	Messages,
	getMessageHistory,
	insertNewMessage
} = require('/model/messages');

//Configure mongodb connection
const url = 'mongodb+srv://csduser:pass123@csdev.nsb90.mongodb.net/CSDev?retryWrites=true&w=majority';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }).then(function() {
	console.log('mongodb connected')
}).catch(function(err) { console.log(err)});

//Configure app and server
const app = express();
const server = http.createServer(app);

//Set static folder
app.use(express.static(path.join(__dirname, 'src')));

//Configure socket.io
const io = socketIo(server);

io.on('connection', async function(socket) {
	socket.on('newUser', function(username) {
			//Logic to connect user to chat
	});

	socket.on('newMessage', function(message) {
			//Logic to append new message to chat
	});

	socket.on('disconnect', function(user) {
			//Logic to disconnect user from chat
	});
});


server.listen(9000, function() {
	console.log('Listening on port 9000');
})


