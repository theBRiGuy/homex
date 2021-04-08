import React, { useEffect, useState } from 'react';
import { classes, findRange, formatPrice, priceValueFromString } from './utils';

function Bidder(props) {
	const baseCls = 'Bidder';
	const { listPrice, solds } = props;
	const [soldsRange, setSoldsRange] = useState(null);

	useEffect(() => {
		if (solds) {
			setSoldsRange(findRange(solds.map((property) => property.sold)));
		}
	}, [solds]);

	return (
		<div className={baseCls}>
			{soldsRange && (
				<>
					<div
						className={classes(
							`${baseCls}`,
							'h-6',
							'w-full',
							'bg-indigo-400',
							'rounded-full'
						)}
					>
						<div className={classes('relative')}>
							<div
								className={classes(
									`${baseCls}__filler`,
									'bg-indigo-600',
									'rounded-full',
									'text-right',
									'inline-block',
									'h-6',
									'absolute',
									'text-white',
									'px-2'
								)}
								style={{
									left: `${
										((priceValueFromString(listPrice) - soldsRange.low) /
											(soldsRange.high - soldsRange.low)) *
										100
									}%`,
									transform: 'translateX(-50%)'
								}}
							>
								this property
							</div>
						</div>
					</div>
					<div
						className={classes(
							`${baseCls}__labels`,
							'w-full',
							'flex',
							'justify-between'
						)}
					>
						<div>{formatPrice(soldsRange.low)} (low)</div>
						<div>{formatPrice(soldsRange.high)} (high)</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Bidder;
