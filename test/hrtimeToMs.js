'use strict';

const test = require('tape');
const utils = new (require(__dirname + '/../index.js'))();

test('hrtimeToMs() - Test default amount of decimals', t => {
	const res = utils.hrtimeToMs(process.hrtime());
	t.equal(typeof res, 'string', 'res should be a string, but returned as ' + typeof res + ' and its value is ' + res);
	t.equal(res.split('.')[1].length, 2, 'The string length after the . should be 2, but is ' + res.split('.')[1].length);
	t.end();
});

test('hrtimeToMs() - Test custom amount of decimals', t => {
	const res = utils.hrtimeToMs(process.hrtime(), 4);
	t.equal(typeof res, 'string', 'res should be a string, but returned as ' + typeof res + ' and its value is ' + res);
	t.equal(res.split('.')[1].length, 4, 'The string length after the . should be 4, but is ' + res.split('.')[1].length);
	t.end();
});
