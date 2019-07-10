'use strict';

const test = require('tape');
const utils = new (require(__dirname + '/../index.js'))();

test('log - should log to info', t => {
	const oldStdout = process.stdout.write;
	const log = new utils.Log();

	let outputMsg;

	process.stdout.write = msg => outputMsg = msg;

	log.info('flurp');

	process.stdout.write = oldStdout;

	t.equal(outputMsg.substring(19), 'Z [\u001b[1;32minf\u001b[0m] flurp\n');

	t.end();
});

test('log - should log to error', t => {
	const oldStderr = process.stderr.write;
	const log = new utils.Log();

	let outputMsg;

	process.stderr.write = msg => outputMsg = msg;

	log.error('burp');

	process.stderr.write = oldStderr;

	t.equal(outputMsg.substring(19), 'Z [\u001b[1;31merr\u001b[0m] burp\n');

	t.end();
});

test('log - should not print debug by default', t => {
	const oldStdout = process.stdout.write;
	const log = new utils.Log();

	let outputMsg = 'yay';

	process.stdout.write = msg => outputMsg = msg;

	log.debug('nai');

	process.stdout.write = oldStdout;

	t.equal(outputMsg, 'yay');

	t.end();
});

test('log - should print debug when given "silly" as level', t => {
	const oldStdout = process.stdout.write;
	const log = new utils.Log('silly');

	let outputMsg = 'woof';

	process.stdout.write = msg => outputMsg = msg;

	log.debug('wapp');

	process.stdout.write = oldStdout;

	t.equal(outputMsg.substring(19), 'Z [\u001b[1;35mdeb\u001b[0m] wapp\n');

	t.end();
});

test('log - Use environment variable as default log level', t => {
	const oldEnv = process.env.NODE_LOG_LVL;
	const oldStdout = process.stdout.write;
	let outputMsg = 'fail';

	process.env.NODE_LOG_LVL = 'debug';

	const log = new utils.Log();

	process.stdout.write = msg => outputMsg = msg;

	log.debug('tepp');

	process.stdout.write = oldStdout;

	process.env.NODE_LOG_LVL = oldEnv;

	t.equal(outputMsg.substring(19), 'Z [\u001b[1;35mdeb\u001b[0m] tepp\n');

	t.end();
});
