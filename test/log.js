'use strict';

const	assert	= require('assert'),
	utils	= new (require(__dirname + '/../index.js'))();

describe('log', function () {
	it('should log to info', function (done) {
		const	oldStdout	= process.stdout.write,
			log	= new utils.Log();

		let	outputMsg;

		process.stdout.write = function (msg) {
			outputMsg	= msg;
		};

		log.info('flurp');

		process.stdout.write	= oldStdout;

		assert.strictEqual(outputMsg.substring(19),	'Z [inf] flurp\n');

		done();
	});

	it('should log to error', function (done) {
		const	oldStderr	= process.stderr.write,
			log	= new utils.Log();

		let	outputMsg;

		process.stderr.write = function (msg) {
			outputMsg	= msg;
		};

		log.error('burp');

		process.stderr.write	= oldStderr;

		assert.strictEqual(outputMsg.substring(19),	'Z [err] burp\n');

		done();
	});

	it('should not print debug by default', function (done) {
		const	oldStdout	= process.stdout.write,
			log	= new utils.Log();

		let	outputMsg	= 'yay';

		process.stdout.write = function (msg) {
			outputMsg	= msg;
		};

		log.debug('nai');

		process.stdout.write	= oldStdout;

		assert.strictEqual(outputMsg,	'yay');

		done();
	});

	it('should print debug when given "silly" as level', function (done) {
		const	oldStdout	= process.stdout.write,
			log	= new utils.Log('silly');

		let	outputMsg	= 'woof';

		process.stdout.write = function (msg) {
			outputMsg	= msg;
		};

		log.debug('wapp');

		process.stdout.write	= oldStdout;

		assert.strictEqual(outputMsg.substring(19),	'Z [deb] wapp\n');

		done();
	});
});