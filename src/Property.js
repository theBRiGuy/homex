import React, { useState, useEffect } from 'react';
import Gallery from './Gallery';
import Bidder from './Bidder';
import Attributes from './Attributes';
import Spinner from './Spinner';
import { classes } from './utils';

function Property(props) {
	const baseCls = 'Property';
	const [data, setData] = useState(null);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const currentURL = new URL(window.location);
		const URLToFetch = `http://localhost:4000${currentURL.pathname}`;
		fetch(URLToFetch)
			.then((response) => response.json())
			.then((json) => {
				// Split address into 2 separate parts (stripping out <br> coming from MLS)
				let [address1, address2] = json.address.split('<br>');
				setData({ ...json, address1, address2 });
			})
			.catch((err) => setErrors(err));
	}, []);

	return (
		<div
			className={classes(`${baseCls}`, 'md:flex', 'gap-8', 'justify-center')}
		>
			{!data && <Spinner text="Loading..." />}
			{data && (
				<>
					<div className={classes(`${baseCls}__image`, 'md:w-5/12')}>
						<Gallery data={data.gallery} />
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
								'font-black'
							)}
						>
							{data.address2}
						</h2>
						<h3
							className={classes(
								`${baseCls}__mls`,
								'font-light',
								'text-xl',
								'mt-1'
							)}
						>
							MLS<sup>&reg;</sup>:&nbsp;
							{data.mls}
						</h3>
						<h2
							className={classes(
								`${baseCls}__price`,
								'font-bold',
								'text-xl',
								'mt-8'
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
						<div className={classes(`${baseCls}__bidder`, 'mt-4')}>
							<Bidder asking={data.price} completed={75} />
						</div>
						<p className={classes(`${baseCls}__desc`, 'mt-8')}>{data.desc}</p>
						<div className={classes(`${baseCls}__attributes`, 'mt-4')}>
							<Attributes data={data.attributes} />
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Property;
