import test from 'tape';
import Utils from '../src/index';

const utils = new Utils();

test('setTimeout() - Wait about 100ms', t => {
	const start = new Date();
	utils.setTimeout(100).then(() => {
		// @ts-ignore: Do not know why this is making an error
		const passedTime = new Date() - start;
		t.equal((passedTime - 100) >= 0, true);
		t.equal((passedTime - 110) < 0, true);
		t.end();
	});
});

test('setTimeout() - Wait about 1ms', t => {
	const start = new Date();
	utils.setTimeout(1).then(() => {
		// @ts-ignore: Do not know why this is making an error
		const passedTime = new Date() - start;
		t.equal((passedTime - 1) >= 0, true);
		t.equal((passedTime - 10) < 0, true);
		t.end();
	});
});
