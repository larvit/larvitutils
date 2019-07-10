'use strict';

const test = require('tape');
const utils = new (require(__dirname + '/../index.js'))();

test('isInt() - Should return false if input is a string', t => {
	const input = 'string';
	const checkedInt = utils.isInt(input);

	t.equal(checkedInt, false, 'Should return false if input is a string, but returned true.');

	t.end();
});

test('isInt() - Should return false if input is a function', t => {
	function input() {};
	const checkedInt = utils.isInt(input);

	t.equal(checkedInt, false, 'Should return false if input is a function, but returned true.');

	t.end();
});

test('isInt() - Should return false if input is a float', t => {
	const input = 1.5;
	const checkedInt = utils.isInt(input);

	t.equal(checkedInt, false, 'Should return false if input is a float, but returned true.');

	t.end();
});

test('isInt() - Should return true if input is a float with a zero decimal', t => {
	const input = 1.0;
	const checkedInt = utils.isInt(input);

	t.equal(checkedInt, true, 'Should return true if input is a float with zero decimal, but returned false.');

	t.end();
});

test('isInt() - Should return true if input is a int', t => {
	const input = 1;
	const checkedInt = utils.isInt(input);

	t.equal(checkedInt, true, 'Should return true if input is a int, but returned false.');

	t.end();
});
