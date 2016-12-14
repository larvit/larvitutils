'use strict';

const	assert	= require('assert'),
	utils	= require(__dirname + '/../index.js');

describe('isInt', function() {
	it('Should return false if input is a string', function(done) {
		const	input	= 'string',
			checkedInt	= utils.isInt(input);

		assert.deepEqual(checkedInt, false, 'Should return false if input is a string, but returned true.');

		done();
	});

	it('Should return false if input is a function', function(done) {
		const	input	= function() {},
			checkedInt	= utils.isInt(input);

		assert.deepEqual(checkedInt, false, 'Should return false if input is a function, but returned true.');

		done();
	});

	it('Should return false if input is a float', function(done) {
		const	input	= 1.5,
			checkedInt	= utils.isInt(input);

		assert.deepEqual(checkedInt, false, 'Should return false if input is a float, but returned true.');

		done();
	});

	it('Should return true if input is a float with a zero decimal', function(done) {
		const	input	= 1.0,
			checkedInt	= utils.isInt(input);

		assert.deepEqual(checkedInt, true, 'Should return true if input is a float with zero decimal, but returned false.');

		done();
	});

	it('Should return true if input is a int', function(done) {
		const	input	= 1,
			checkedInt	= utils.isInt(input);

		assert.deepEqual(checkedInt, true, 'Should return true if input is a int, but returned false.');

		done();
	});
});
