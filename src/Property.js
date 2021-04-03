import React, { useState, useEffect } from 'react';
import Image from './Image';
import Bid from './Bid';

function Property(props) {
	const baseCls = 'Property';
	const [data, setData] = useState(null);
	const [errors, setErrors] = useState(null);

	useEffect(() => {
		const url = 'http://localhost:4000/';
		fetch(url)
			.then((response) => response.json())
			.then((json) => {
				setData(json);
			})
			.catch((err) => setErrors(err));
	}, []);

	return (
		<div className={`${baseCls}`}>
			{data && (
				<>
					<h1
						className={`${baseCls}__address`}
						dangerouslySetInnerHTML={{ __html: data.address }}
					/>
					<h2 className={`${baseCls}__price`}>{data.price}</h2>
					<Bid asking={data.price} />
					<Image image={data.meta.image} alt={data.meta.name} />
				</>
			)}
		</div>
	);
}

export default Property;
