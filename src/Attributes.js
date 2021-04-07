import React from 'react';
import { classes } from './utils';

function Attributes(props) {
	const { data } = props;
	const baseCls = 'Attributes';

	return (
		<div
			className={classes(
				`${baseCls}`,
				'grid',
				'grid-cols-3',
				'gap-3',
				'auto-rows-fr'
			)}
		>
			{data.map((attrItem) => {
				const { label, value } = attrItem;
				return (
					<div
						className={classes(
							`${baseCls}__item`,
							'rounded-lg',
							'bg-indigo-500',
							'shadow-md',
							'p-2',
							'text-white'
						)}
					>
						<div className={classes(`${baseCls}__item__label`, 'text-xs')}>
							{label}
						</div>
						<div
							className={classes(
								`${baseCls}__item__value`,
								'font-bold',
								'text-sm'
							)}
							dangerouslySetInnerHTML={{ __html: value }}
						></div>
					</div>
				);
			})}
		</div>
	);
}

export default Attributes;
