'use strict';

const test = require('tape');
const utils = new (require(__dirname + '/../index.js'))();

test('hashStringToString() - Hash string to string of length 0', t => {
	t.equal(utils.hashStringToString('asdf', 0), '');
	t.end();
});

test('hashStringToString() - Hash string to string of length 1', t => {
	t.equal(utils.hashStringToString('asdf', 1).length, 1);
	t.end();
});

test('hashStringToString() - Hash string to string of length 2', t => {
	t.equal(utils.hashStringToString('asdf', 2).length, 2);
	t.end();
});

test('hashStringToString() - Hash string to string give the same output when input is the same', t => {
	const first = utils.hashStringToString('asdf', 1);

	t.equal(utils.hashStringToString('asdf', 1), first);
	t.equal(utils.hashStringToString('asdf', 1), first);
	t.equal(utils.hashStringToString('asdf', 1), first);
	t.equal(utils.hashStringToString('asdf', 1), first);
	t.end();
});

test('hashStringToString() - Hash string to string where result string length is longer than input string length', t => {
	t.equal(utils.hashStringToString('nisse', 20).length, 20);
	t.end();
});

test('hashStringToString() - Hash similar string should give different results', t => {
	t.notEqual(utils.hashStringToString('nisse1', 6), utils.hashStringToString('nisse2', 6));
	utils.hashStringToString('pisse1', 6);
	t.end();
});

test('hashStringToString() - Hash string where all characters are the same should result in string where all characters are not the same', t => {
	const result = utils.hashStringToString('aaaaa', 6);
	const resultAsArray = result.split('');

	t.notEqual(resultAsArray.filter(x => x === resultAsArray[0]).length, resultAsArray.length);

	t.end();
});

test('hashStringToString() - Two similar strings should not give the same hash (bug fixed so using exact strings that caused trouble here)', t => {
	const str1 = 'L266' + '9560-13';
	const str2 = 'L266' + '9500-13';

	t.notEqual(utils.hashStringToString(str1, 6), utils.hashStringToString(str2, 6));
	t.end();
});
