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

test('log - Print nothing, even on error, when no valid lvl is set', t => {
	const oldStderr = process.stderr.write;
	let outputMsg = 'SOMETHING';
	const log = new utils.Log('none');
	process.stderr.write = msg => outputMsg = msg;
	log.error('kattbajs');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.substring(19), '');
	t.end();
});

test('log - Test silly', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new utils.Log('silly');
	process.stdout.write = msg => outputMsg = msg;
	log.silly('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;37msil\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test debug', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new utils.Log('debug');
	process.stdout.write = msg => outputMsg = msg;
	log.debug('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;35mdeb\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test verbose', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new utils.Log('verbose');
	process.stdout.write = msg => outputMsg = msg;
	log.verbose('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;34mver\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test info', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new utils.Log('info');
	process.stdout.write = msg => outputMsg = msg;
	log.info('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;32minf\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test warn', t => {
	const oldStderr = process.stderr.write;
	let outputMsg = '';
	const log = new utils.Log('warn');
	process.stderr.write = msg => outputMsg = msg;
	log.warn('kattbajs');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;33mwar\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test error', t => {
	const oldStderr = process.stderr.write;
	let outputMsg = '';
	const log = new utils.Log('silly');
	process.stderr.write = msg => outputMsg = msg;
	log.error('kattbajs');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;31merr\x1b[0m] kattbajs\n');
	t.end();
});
