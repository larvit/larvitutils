import test from 'tape';
import { Log } from '../src/index';

test('log - should log to info', t => {
	const oldStdout = process.stdout.write;
	const log = new Log();

	let outputMsg = '';

	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;

	log.info('flurp');

	process.stdout.write = oldStdout;

	t.equal(
		outputMsg.substring(19),
		'Z [\u001b[1;32minf\u001b[0m] flurp\n',
		'Should detect "flurp" in the output of the inf log',
	);

	t.end();
});

test('log - should log to error', t => {
	const oldStderr = process.stderr.write;
	const log = new Log();

	let outputMsg = '';

	// @ts-ignore: This works well, and is only for test purposes
	process.stderr.write = msg => outputMsg = msg;

	log.error('burp');

	process.stderr.write = oldStderr;

	t.equal(
		outputMsg.substring(19),
		'Z [\u001b[1;31merr\u001b[0m] burp\n',
		'Should detect "burp" in the output of the err log',
	);

	t.end();
});

test('log - should not print debug by default', t => {
	const oldStdout = process.stdout.write;
	const log = new Log();

	let outputMsg = 'yay';

	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;

	log.debug('nai');

	process.stdout.write = oldStdout;

	t.equal(outputMsg, 'yay', 'Should get "yay" since the outputMsg should not be replaced');

	t.end();
});

test('log - should print debug when given "silly" as level', t => {
	const oldStdout = process.stdout.write;
	const log = new Log('silly');

	let outputMsg = 'woof';

	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;

	log.debug('wapp');

	process.stdout.write = oldStdout;

	t.equal(outputMsg.substring(19), 'Z [\u001b[1;35mdeb\u001b[0m] wapp\n', 'Should obtain "wapp" from the deb log');

	t.end();
});

test('log - Use environment variable as default log level', t => {
	const oldEnv = process.env.NODE_LOG_LVL;
	const oldStdout = process.stdout.write;
	let outputMsg = 'fail';

	process.env.NODE_LOG_LVL = 'debug';

	const log = new Log();

	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;

	log.debug('tepp');

	process.stdout.write = oldStdout;

	process.env.NODE_LOG_LVL = oldEnv;

	t.equal(outputMsg.substring(19), 'Z [\u001b[1;35mdeb\u001b[0m] tepp\n', 'Should get "tepp" from the deb log');

	t.end();
});

test('log - Print nothing, even on error, when no valid lvl is set', t => {
	const oldStderr = process.stderr.write;
	let outputMsg = 'SOMETHING';
	const log = new Log('none');
	// @ts-ignore: This works well, and is only for test purposes
	process.stderr.write = msg => outputMsg = msg;
	log.error('kattbajs');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.substring(19), '', 'Nothing should be written without an error log level');
	t.end();
});

test('log - Test silly', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new Log('silly');
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.silly('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;37msil\x1b[0m] kattbajs\n', 'Should obtain "kattbajs" from the outputMsg');
	t.end();
});

test('log - Test debug', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new Log('debug');
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.debug('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;35mdeb\x1b[0m] kattbajs\n', '');
	t.end();
});

test('log - Test verbose', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new Log('verbose');
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.verbose('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;34mver\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test info', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new Log('info');
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.info('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;32minf\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test warn', t => {
	const oldStderr = process.stderr.write;
	let outputMsg = '';
	const log = new Log('warn');
	// @ts-ignore: This works well, and is only for test purposes
	process.stderr.write = msg => outputMsg = msg;
	log.warn('kattbajs');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;33mwar\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test error', t => {
	const oldStderr = process.stderr.write;
	let outputMsg = '';
	const log = new Log('silly');
	// @ts-ignore: This works well, and is only for test purposes
	process.stderr.write = msg => outputMsg = msg;
	log.error('kattbajs');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;31merr\x1b[0m] kattbajs\n');
	t.end();
});

test('log - Test initializing with options object', t => {
	const oldStderr = process.stderr.write;
	let outputMsg = '';
	const log = new Log({ level: 'error' });
	// @ts-ignore: This works well, and is only for test purposes
	process.stderr.write = msg => outputMsg = msg;
	log.error('an error');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.substring(19), 'Z [\x1b[1;31merr\x1b[0m] an error\n');
	t.end();
});

test('log - Default level is info if nothing else is specified', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new Log({ level: undefined });
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.info('information');
	process.stdout.write = oldStdout;
	t.ok(outputMsg.includes(' information'));
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.verbose('not logged');
	process.stdout.write = oldStdout;
	t.notOk(outputMsg.includes(' not logged'));
	t.end();
});

test('log - Test only errors are logged if log level is error', t => {
	const oldStdout = process.stdout.write;
	const oldStderr = process.stderr.write;
	let outputMsg = '';
	const log = new Log('error');
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.silly('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.length, 0, 'Log level "silly" should not be logged');

	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.debug('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.length, 0, 'Log level "debug" should not be logged');

	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.verbose('kattbajs');
	process.stdout.write = oldStdout;
	t.equal(outputMsg.length, 0, 'Log level "verbose" should not be logged');

	// @ts-ignore: This works well, and is only for test purposes
	process.stderr.write = msg => outputMsg = msg;
	log.warn('kattbajs');
	process.stderr.write = oldStderr;
	t.equal(outputMsg.length, 0, 'Log level "warn" should not be logged');

	// @ts-ignore: This works well, and is only for test purposes
	process.stderr.write = msg => outputMsg = msg;
	log.error('kattbajs');
	process.stderr.write = oldStderr;
	t.ok(outputMsg.includes(' kattbajs'), 'Log level "error" should be logged');
	t.end();
});

test('log - Test with metadata', t => {
	const oldStdout = process.stdout.write;
	let outputMsg = '';
	const log = new Log('info');
	// @ts-ignore: This works well, and is only for test purposes
	process.stdout.write = msg => outputMsg = msg;
	log.info('kattbajs', { foo: 'bar' });
	process.stdout.write = oldStdout;
	t.equal(outputMsg.split(' kattbajs ')[1].trim(), '{"foo":"bar"}', 'Metadata should be included in output');
	t.end();
});