'use strict';

const test = require('tape');
const utils = new (require(__dirname + '/../index.js'))();

test('formatuuid() - Should convert a binary buffer to Uuid string', t => {
	const uuid = utils.formatUuid(Buffer.from('f9684592b24542fa88c69f16b9236ac3', 'hex'));

	t.equal(uuid, 'f9684592-b245-42fa-88c6-9f16b9236ac3');

	t.end();
});

test('formatuuid() - Should trim a hex string and return its uuid value', t => {
	const uuidStr = '  0e7e26b7-f1804d65-9512-80b776a7509e    ';
	const formatted = utils.formatUuid(uuidStr);

	t.equal(formatted, '0e7e26b7-f180-4d65-9512-80b776a7509e');
	t.end();
});

test('formatuuid() - Should add dashes to a hex string', t => {
	const uuidStr = '62be934b24c24944981c40d4163e3bc9';
	const formatted = utils.formatUuid(uuidStr);

	t.equal(formatted, '62be934b-24c2-4944-981c-40d4163e3bc9');
	t.end();
});

test('formatuuid() - Should fail to format a malformed string', t => {
	const blaj = utils.formatUuid('blaj');
	const toShortHex = utils.formatUuid('62be934b24c2494981c40d4163e3bc9');
	const toLongHex = utils.formatUuid('62be934b24c24944981c40d4163e3bc93');

	t.equal(blaj, false);
	t.equal(toShortHex, false);
	t.equal(toLongHex, false);

	t.end();
});

test('formatuuid() - Should format a upper case string to lower case', t => {
	const formatted = utils.formatUuid('80D7B01D-E5D8-43A4-B5F1-E2703506860A');

	t.equal(formatted, '80d7b01d-e5d8-43a4-b5f1-e2703506860a');

	t.end();
});

test('formatuuid() - Should fail on anything but a string', t => {
	const test1 = utils.formatUuid([3, 4]);
	const test2 = utils.formatUuid({höhö: 'fippel'});

	t.equal(test1, false);
	t.equal(test2, false);

	t.end();
});
