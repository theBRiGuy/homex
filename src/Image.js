import React from 'react';
import { classes } from './utils';

function Image(props) {
	const { image, alt } = props;
	const baseCls = 'Image';

	return (
		<img
			className={classes(`${baseCls}`, 'shadow-lg')}
			src={image[1]}
			srcSet={`${image[1]} 300w, ${image[0]} 768w`}
			alt={alt}
		/>
	);
}

export default Image;
