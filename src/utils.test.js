import { formatPrice, priceValueFromString, findRange } from './utils.js';

describe('formatPrice', () => {
	const testData = [
		['zero', 0, '$0'],
		['1 digit', 1, '$1'],
		['4 digits', 1024, '$1,024'],
		['6 digits', 123456, '$123,456'],
		['7 digits', 1234567, '$1,234,567']
	];

	testData.forEach((testItem) => {
		test(testItem[0], () => expect(formatPrice(testItem[1])).toBe(testItem[2]));
	});
});

describe('priceValueFromString', () => {
	const testData = [
		['zero', '0', 0],
		['1 digit', '1', 1],
		['4 digits', '1,001', 1001],
		['4 digits with cents', '1,000.50', 1000.5],
		['only cents', '.55', 0.55],
		['7 digits', '1,300,001', 1300001]
	];

	testData.forEach((testItem) => {
		test(testItem[0], () =>
			expect(priceValueFromString(testItem[1])).toBe(testItem[2])
		);
	});
});

describe('findRange', () => {
	const testData = [
		[
			'low,high,avg correct for array of integers 3 long',
			[100, 650, 920],
			{ low: 100, high: 300, avg: 200 }
		]
	];

	testData.forEach((testItem) => {
		test(testItem[0], () => {
			const result = findRange(testItem[1]);
			expect(result.low).toBe(100);
			expect(result.high).toBe(920);
			expect(result.avg).toBe(557);
		});
	});
});
