'use strict';

const test = require('tape');
const lUtils = new (require(__dirname + '/../index.js'))();

test('setTimeout() - Wait about 100ms', t => {
	const start = new Date();
	lUtils.setTimeout(100).then(() => {
		const passedTime = new Date() - start;
		t.equal((passedTime - 100) >= 0, true);
		t.equal((passedTime - 110) < 0, true);
		t.end();
	});
});

test('setTimeout() - Wait about 1ms', t => {
	const start = new Date();
	lUtils.setTimeout(1).then(() => {
		const passedTime = new Date() - start;
		t.equal((passedTime - 1) >= 0, true);
		t.equal((passedTime - 10) < 0, true);
		t.end();
	});
});
