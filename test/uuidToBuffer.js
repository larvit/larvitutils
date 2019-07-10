'use strict';

const test = require('tape');
const Utils = require(__dirname + '/../index.js');
const utils = new Utils({log: new (new Utils()).Log('none')});

test('uuidToBuffer() - Should convert an Uuid string to a buffer', t => {
	const uuidStr = 'f9684592-b245-42fa-88c6-9f16b9236ac3';
	const uuidBuf = utils.uuidToBuffer(uuidStr);

	t.equal(uuidBuf.toString('hex'), 'f9684592b24542fa88c69f16b9236ac3', 'Uuid string checked, expected "f9684592b24542fa88c69f16b9236ac3", got "' + uuidBuf.toString('hex') + '"');

	t.end();
});

test('uuidToBuffer() - Should fail to convert an invalid Uuid string to buffer', t => {
	const uuidStr = 'f96845-42fa-88c6-9f16b9236ac3';
	const uuidBuf = utils.uuidToBuffer(uuidStr);

	t.equal(uuidBuf, false, 'uuidBuf should be false, is "' + uuidBuf + '"');

	t.end();
});

test('uuidToBuffer() - Should fail to convert a non-string', t => {
	t.equal(utils.uuidToBuffer({ foo: 'bar' }), false);
	t.equal(utils.uuidToBuffer(undefined), false);
	t.equal(utils.uuidToBuffer(null), false);

	t.end();
});
