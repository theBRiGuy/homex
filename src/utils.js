import { useEffect } from 'react';

export const classes = (...args) => args.join(' ');

export const useKeyPress = (key, action, deps = []) => {
	useEffect(() => {
		function onKeyUp(e) {
			if (e.key === key) action();
		}
		window.addEventListener('keyup', onKeyUp);
		return () => window.removeEventListener('keyup', onKeyUp);
	}, deps);
};

export const formatPrice = (price) => {
	return `$${price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}`;
};

export const priceValueFromString = (strPrice) => {
	return Number(strPrice.replace(/[^0-9.-]+/g, ''));
};

export const findRange = (priceArr) => {
	console.log('priceArr is', priceArr);
	const sortedPriceArr = priceArr.sort((a, b) => a - b);
	return {
		low: sortedPriceArr[0],
		high: sortedPriceArr[sortedPriceArr.length - 1],
		avg: Math.round(
			sortedPriceArr.reduce((a, b) => a + b, 0) / sortedPriceArr.length || 0
		)
	};
};
