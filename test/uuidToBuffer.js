'use strict';

var assert = require('assert'),
    utils  = require('../larvitutils');

describe('uuidToBuffer', function() {
	it('Should convert an Uuid string to a buffer', function(done) {
		var uuidStr = 'f9684592-b245-42fa-88c6-9f16b9236ac3',
		    uuidBuf = utils.uuidToBuffer(uuidStr);

		assert(uuidBuf.toString('hex') === 'f9684592b24542fa88c69f16b9236ac3', 'Uuid string is wrong, expected "f9684592b24542fa88c69f16b9236ac3" but got "' + uuidBuf.toString('hex') + '"');

		done();
	});

	it('Should fail to convert an invalid Uuid string to buffer', function(done) {
		var uuidStr = 'f96845-42fa-88c6-9f16b9236ac3',
		    uuidBuf = utils.uuidToBuffer(uuidStr);

		assert(uuidBuf === false, 'uuidBuf should be false, but is "' + uuidBuf + '"');

		done();
	});
});