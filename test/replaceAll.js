'use strict';

const test = require('tape');
const utils = new (require(__dirname + '/../index.js'))();

test('replaceAll() - Should replace all occurences of - to _ in an UUID', t => {
	const uuidStr = 'f9684592-b245-42fa-88c6-9f16b9236ac3';
	const newStr = utils.replaceAll('-', '_', uuidStr);

	t.equal(newStr, 'f9684592_b245_42fa_88c6_9f16b9236ac3');

	t.end();
});

test('replaceAll() - Should leave a string unaltered if it have no occurences of the string to be replaced', t => {
	const uuidStr = 'f9684592b24542fa88c69f16b9236ac3';
	const newStr = utils.replaceAll('-', '_', uuidStr);

	t.equal(newStr, 'f9684592b24542fa88c69f16b9236ac3');

	t.end();
});

test('replaceAll() - Should be able to replace to nothing', t => {
	const uuidStr = 'f9684592-b245-42fa-88c6-9f16b9236ac3';
	const newStr = utils.replaceAll('-', '', uuidStr);

	t.equal(newStr, 'f9684592b24542fa88c69f16b9236ac3');

	t.end();
});

test('replaceAll() - Should not break if we pass RegExp unsafe char', t => {
	const uuidStr = 'f9684592-b245-42fa.88c6.9f16b9236ac3';
	const newStr = utils.replaceAll('.', 'poo', uuidStr);

	t.equal(newStr, 'f9684592-b245-42fapoo88c6poo9f16b9236ac3');

	t.end();
});
