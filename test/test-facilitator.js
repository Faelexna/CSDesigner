//inside test/test-facilitator.js

const mongoose = require('mongoose');

//tells mongoose to use an up-to-date version of promises
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect('mongodb+srv://csduser:pass123@csdev.nsb90.mongodb.net/CSDev?retryWrites=true&w=majority');
mongoose.connection.once('open', function() {
	console.log('mongodb connected').on('error', function (error) {
		console.warn('Error: ', error)
	});
});

//empty tables before each test
beforeEach(function(done) {
	mongoose.connection.collections.messages.deleteMany();
	mongoose.connection.collections.users.deleteMany();
	done();
});
