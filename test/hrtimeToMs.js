'use strict';

var assert = require('assert'),
    utils  = require('../larvitutils');

describe('HrtimeToMs', function() {
	it('Test default amount of decimals', function(done) {
		var res = utils.hrtimeToMs(process.hrtime());
		assert.deepEqual(typeof res, 'string', 'res should be a string, but returned as ' + typeof res + ' and its value is ' + res);
		assert.deepEqual(res.split('.')[1].length, 2, 'The string length after the . should be 2, but is ' + res.split('.')[1].length);
		done();
	});

	it('Test custom amount of decimals', function(done) {
		var res = utils.hrtimeToMs(process.hrtime(), 4);
		assert.deepEqual(typeof res, 'string', 'res should be a string, but returned as ' + typeof res + ' and its value is ' + res);
		assert.deepEqual(res.split('.')[1].length, 4, 'The string length after the . should be 4, but is ' + res.split('.')[1].length);
		done();
	});
});