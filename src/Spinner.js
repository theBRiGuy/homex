import React from 'react';
import { classes } from './utils';

function Spinner(props) {
	const { text } = props;
	const baseCls = 'Spinner';
	return (
		<div role="alert" aria-busy="true">
			<button
				type="button"
				className={classes(
					`${baseCls}`,
					'inline-flex',
					'flex-none',
					'bg-red-400',
					'p-4',
					'rounded-lg',
					'text-white',
					'font-bold'
				)}
				disabled
			>
				<svg
					className="animate-spin h-5 w-5 mr-3"
					viewBox="0 0 24 24"
					fill="none"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				{text}
			</button>
		</div>
	);
}

export default Spinner;
