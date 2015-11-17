'use strict';

var assert = require('assert'),
    utils  = require('../larvitutils');

describe('formatUuidStr', function() {
	it('Should convert a binary buffer to Uuid string', function(done) {
		var uuid = utils.formatUuidStr(new Buffer('f9684592b24542fa88c69f16b9236ac3', 'hex'));

		assert(uuid === 'f9684592-b245-42fa-88c6-9f16b9236ac3', 'Uuid is wrong, expected "f9684592-b245-42fa-88c6-9f16b9236ac3", but got "' + uuid + '"');

		done();
	});

	it('Should trim a hex string and return its uuid value', function(done) {
		var uuidStr   = '  0e7e26b7-f1804d65-9512-80b776a7509e    ',
		    formatted = utils.formatUuidStr(uuidStr);

		assert(formatted === '0e7e26b7-f180-4d65-9512-80b776a7509e', 'Uuid is wrong, expected "0e7e26b7-f180-4d65-9512-80b776a7509e" but got "' + formatted + '"');
		done();
	});

	it('Should add dashes to a hex string', function(done) {
		var uuidStr   = '62be934b24c24944981c40d4163e3bc9',
		    formatted = utils.formatUuidStr(uuidStr);

		assert(formatted === '62be934b-24c2-4944-981c-40d4163e3bc9', 'Uuid is wrong, expected "62be934b-24c2-4944-981c-40d4163e3bc9" but got "' + formatted + '"');
		done();
	});

	it('Should fail to format a malformed string', function(done) {
		var blaj       = utils.formatUuidStr('blaj'),
		    toShortHex = utils.formatUuidStr('62be934b24c2494981c40d4163e3bc9'),
		    toLongHex  = utils.formatUuidStr('62be934b24c24944981c40d4163e3bc93');

		assert(blaj === false, 'Expected false but got "' + blaj + '"');
		assert(toShortHex === false, 'Expected false but got "' + toShortHex + '"');
		assert(toLongHex === false, 'Expected false but got "' + toLongHex + '"');

		done();
	});
});