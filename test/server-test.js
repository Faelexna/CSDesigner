//inside server-test.js
const expect= require('chai').expect;
const io = require('socket.io-client');
const socketTester = require('socket-tester');
const app = require('../server');

const ioConnString = 'http://localhost:9000';

const options = {
	transports: ['websocket'],
	'force new connection': true
};

let ioTester = new socketTester(io, ioConnString, options);

describe('io-server', function() {
	it('should be able to handle multiple users', function (done) {
		let nClients = Math.floor(Math.random() * 10) + 3;
		let client1 = {
			on: {
				'newUser': ioTester.shouldBeCalledNTimes(nClients)
			},
			emit: {
				'newUser': 'client1'
			}
		};
		let arrClients = [client1];
		for( let i = 2; i <= nClients; i++ ) {
			window['client'+i] = {
				emit: {
					'newUser': 'client'+i
				}
			}
			arrClients.push(window['client'+i]);
		}
		ioTester.run(arrClients, done);
	});

	it('should return a given value', function(done) {
		let client1 = {
			on: {
				'newMessage': ioTester.shouldBeCalledWith('testString')
			},
			emit: {
				'newUser': 'client1'
			}
		};

		let client2 = {
			emit: {
				'newUser': 'client2',
				'newMessage': 'testString'
			}
		};

	ioTester.run([client1, client2], done);
	});

	it('should return n messages but not any sent', function(done) {
		let client1 = {
			on: {
				'message': ioTester.shouldBeCalledNTimesWith(['c2msg','c3msg'])
			},
			emit: {
				'newUser': 'client1',
				'newMessage': 'c1msg'
			}
		};

		let client2 = {
			emit: {
				'newUser': 'client2',
				'newMessage': 'c2msg'
			}
		};

		let client3 = {
			emit: {
				'newUser': 'client3',
				'newMessage': 'c3msg'
			}
		};

		ioTester.run([client1,client2,client3], done);
	});
});
