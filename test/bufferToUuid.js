'use strict';

var assert = require('assert'),
    utils  = require('../larvitutils');

describe('BufferToUuid', function() {
	it('Should convert a binary buffer to Uuid string', function(done) {
		var uuid = utils.bufferToUuid(new Buffer('f9684592b24542fa88c69f16b9236ac3', 'hex'));

		assert(uuid === 'f9684592-b245-42fa-88c6-9f16b9236ac3', 'Uuid is wrong, expected "f9684592-b245-42fa-88c6-9f16b9236ac3", but got "' + uuid + '"');

		done();
	});
});