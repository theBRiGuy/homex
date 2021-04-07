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
