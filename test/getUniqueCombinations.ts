import test from 'tape';
import { Utils } from '../src/index';

const utils = new Utils();

test('getUniqueCombinations() - Two dimensions, from example docs', t => {
	const initObj = {
		foo: ['bar', 'baz'],
		buu: ['lenny', 'bosse'],
	};

	const outObj = utils.getUniqueCombinations(initObj);

	t.equal(outObj.length, 4, 'Four unique combinations should exist');
	t.equal(JSON.stringify(outObj[2]), '{"foo":"baz","buu":"lenny"}', 'Third result should be foo: baz, buu: lenny');

	t.end();
});

test('getUniqueCombinations() - Three dimensions', t => {
	const initObj = {
		size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
		color: ['black', 'brown', 'pink'],
		cut: ['v-type', 'u-type'],
	};

	const outObj = utils.getUniqueCombinations(initObj);


	t.equal(outObj.length, 36, '36 unique combinations should exist');
	t.equal(JSON.stringify(outObj[10]), '{"size":"S","color":"pink","cut":"v-type"}', 'Sample entry should check out');
	t.end();
});
