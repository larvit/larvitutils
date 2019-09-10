'use strict';

const test = require('tape');
const utils = new (require(__dirname + '/../index.js'))();

test('hashUnsignedIntFromString - Test to hash a strgin', t => {
	const bah = utils.hashUnsignedIntFromString('hejsan');

	t.equal(bah, 541986);

	t.end();
});
