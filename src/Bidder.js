import React from 'react';
import { classes } from './utils';

function Bid(props) {
	const { completed } = props;

	const baseCls = 'Bid';
	return (
		<div
			className={classes(
				`${baseCls}`,
				'h-6',
				'w-full',
				'bg-gray-400',
				'rounded-full'
			)}
		>
			<div>
				<span
					className={classes(
						`${baseCls}__filler`,
						'h-full',
						'bg-red-400',
						'rounded-full',
						'text-right',
						'inline-block',
						'h-6'
					)}
					style={{
						width: `${completed}%`
					}}
				>{`${completed}%`}</span>
			</div>
		</div>
	);
}

export default Bid;
