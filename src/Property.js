import React, { useState, useEffect } from 'react';
import Image from './Image';
import Bid from './Bid';
import { classes } from './utils';

function Property(props) {
	const baseCls = 'Property';
	const [data, setData] = useState(null);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const url = 'http://localhost:4000/';
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				// Split address into 2 separate parts (stripping out <br> coming from MLS)
				let [address1, address2] = json.address.split('<br>');
				setData({ ...json, address1, address2 });
			})
			.catch((err) => setErrors(err));
	}, []);

	return (
		<div className={classes(`${baseCls}`, 'md:flex', 'gap-8')}>
			{data && (
				<>
					<div className={classes(`${baseCls}__image`, 'md:w-5/12')}>
						<Image image={data.meta.image} alt={data.meta.name} />
					</div>
					<div
						className={classes(`${baseCls}__details`, 'md:w-7/12', 'text-left')}
					>
						<h1
							className={classes(
								`${baseCls}__address1`,
								'text-green-500',
								'text-4xl',
								'font-black',
								'capitalize',
								'mt-4'
							)}
						>
							{data.address1.toLowerCase()}
						</h1>
						<h2
							className={classes(
								`${baseCls}__address2`,
								'text-green-500',
								'text-xl',
								'font-black',
								'mb-8'
							)}
						>
							{data.address2}
						</h2>
						<h2
							className={classes(
								`${baseCls}__price`,
								'font-bold',
								'text-xl',
								'mb-8'
							)}
						>
							<span
								className={classes(`${baseCls}__price__label`, 'font-normal')}
							>
								Listed at:&nbsp;
							</span>
							<span className={`${baseCls}__price__value font-bold`}>
								{data.price}
							</span>
						</h2>
						<p className={classes(`${baseCls}__desc`)}>{data.desc}</p>
						<Bid asking={data.price} />
					</div>
				</>
			)}
		</div>
	);
}

export default Property;
