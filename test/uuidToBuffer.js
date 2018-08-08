'use strict';

const	assert	= require('assert'),
	Utils	= require(__dirname + '/../index.js'),
	utils	= new Utils({'log': new (new Utils()).Log('none')});

describe('uuidToBuffer', function () {
	it('Should convert an Uuid string to a buffer', function (done) {
		const	uuidStr	= 'f9684592-b245-42fa-88c6-9f16b9236ac3',
			uuidBuf	= utils.uuidToBuffer(uuidStr);

		assert(uuidBuf.toString('hex') === 'f9684592b24542fa88c69f16b9236ac3', 'Uuid string is wrong, expected "f9684592b24542fa88c69f16b9236ac3" but got "' + uuidBuf.toString('hex') + '"');

		done();
	});

	it('Should fail to convert an invalid Uuid string to buffer', function (done) {
		const	uuidStr	= 'f96845-42fa-88c6-9f16b9236ac3',
			uuidBuf	= utils.uuidToBuffer(uuidStr);

		assert(uuidBuf === false, 'uuidBuf should be false, but is "' + uuidBuf + '"');

		done();
	});

	it('Should fail to convert a non-string', function (done) {
		assert.strictEqual(utils.uuidToBuffer({'foo': 'bar'}),	false);
		assert.strictEqual(utils.uuidToBuffer(undefined),	false);
		assert.strictEqual(utils.uuidToBuffer(null),	false);

		done();
	});
});
