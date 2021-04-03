import React from 'react';

function Image(props) {
	const { image, alt } = props;

	return (
		<img
			src={image[1]}
			srcSet={`${image[1]} 300w, ${image[0]} 768w`}
			alt={alt}
		/>
	);
}

export default Image;
