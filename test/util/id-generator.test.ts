import test from 'ava';
import {IdGenerator} from '../../src/util/id-generator.js';

test('generates IDs without duplicates', t => {
	const generator = new IdGenerator();

	t.is(generator.generate(), 0);
	t.is(generator.generate(), 1);
	t.is(generator.generate(), 2);
});

test('reuses IDs that were released', t => {
	const generator = new IdGenerator();

	t.is(generator.generate(), 0);
	t.is(generator.generate(), 1);
	t.is(generator.generate(), 2);

	generator.release(0);

	t.is(generator.generate(), 0);
	t.is(generator.generate(), 3);

	generator.release(4);
	generator.release(99);

	t.is(generator.generate(), 4);
	t.is(generator.generate(), 5);
});
