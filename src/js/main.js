const $ = require('jquery');
const messageForm = $('#message-form');
const collectionMessages = $('.collection-messages');
const io = require('socket.io-client');

const socket = io('http://localhost:9000;');

//Enter collection
socket.on('loadHistory', async function(msgHistory) {
	for( let i = 0; i < msgHistory.length; i++ ) {
		appendMessage(msgHistory[i]);
	}
})

//New message from server
socket.on('appendNewMessage', function(message) {
	appendMessage(message);

	//Scroll to bottom
	collectionMessages.scrollTop = collectionMessages.scrollHeight;
});

//Submit new message
messageForm.addEventListener('submit', function(ev) {
	ev.preventDefault();

	let msg = ev.target.elements.message.value;
	let mUser = ev.target.elements.username.valiue;

	msg = msg.trim();

	if(!msg){
		return false;
	}

	let messageDetail = { mUser: mUser, msg: msg };

	socket.emit('submitNewMessage', messageDetail);

	ev.target.elements.msg.value = '';
	ev.target.elements.msg.focus();
});

//Append new message to chat
function appendMessage(message) {
	let $msgDiv = $('<div>', { 'class': 'message' });
	let $msgMeta = $('<p>', { 'class': 'meta' });
	$msgMeta.innerText = message.mUser;
	let $msgContents = $('<p>', { 'class': 'text' });
	$msgContents.innerText = message.msg;
	$msgDiv.append($msgMeta);
	$msgDiv.append($msgContents);
	collectionMessages.append($msgDiv);
}
