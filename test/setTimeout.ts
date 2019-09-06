import test from 'tape';
import { Utils } from '../src/index';

const utils = new Utils();

test('setTimeout() - Wait about 100ms', async t => {
	const start = Date.now();
	await utils.setTimeout(100);

	const passedTime = Date.now() - start;
	t.equal((passedTime - 100) >= 0, true);
	t.equal((passedTime - 110) < 0, true);
	t.end();
});

test('setTimeout() - Wait about 10ms', async t => {
	const start = Date.now();
	await utils.setTimeout(10);

	const passedTime = Date.now() - start;

	t.equal((passedTime - 1) >= 5, true);
	t.equal((passedTime - 15) < 0, true);
	t.end();
});
