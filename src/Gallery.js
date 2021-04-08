import React, { useState } from 'react';
import { classes, useKeyPress } from './utils';

function Gallery(props) {
	const { data } = props;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const baseCls = 'Gallery';

	const prevImage = () => {
		if (currentImageIndex === 0) {
			setCurrentImageIndex(data.length - 1);
		} else {
			setCurrentImageIndex(currentImageIndex - 1);
		}
	};

	const nextImage = () => {
		if (currentImageIndex === data.length - 1) {
			setCurrentImageIndex(0);
		} else {
			setCurrentImageIndex(currentImageIndex + 1);
		}
	};

	useKeyPress('ArrowLeft', () => prevImage(), [currentImageIndex]);
	useKeyPress('ArrowRight', () => nextImage(), [currentImageIndex]);

	return (
		<div className={classes(`${baseCls}`)}>
			<img
				className={classes(`${baseCls}__image`, 'shadow-lg')}
				src={data[currentImageIndex].full}
				alt="property image"
				aria-live="polite"
			/>
			<div
				className={classes(
					`${baseCls}__cycler`,
					'flex',
					'justify-center',
					'md:justify-end',
					'mt-3'
				)}
			>
				<button
					className={classes(`${baseCls}__cycler__prev`)}
					onClick={prevImage}
					aria-label="previous photo"
				>
					<svg
						className="opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						width="75"
						height="75"
						viewBox="0 0 24 24"
					>
						<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
					</svg>
				</button>
				<span
					className={classes(
						`${baseCls}__cycler__count`,
						'text-7xl',
						'opacity-50',
						'font-bold',
						'w-48',
						'text-center'
					)}
					aria-label={`image ${currentImageIndex + 1} of ${data.length}`}
					aria-live="polite"
				>
					{currentImageIndex + 1}/{data.length}
				</span>
				<button
					className={classes(`${baseCls}__cycler__next`)}
					onClick={nextImage}
					aria-label="next photo"
				>
					<svg
						className="opacity-50"
						xmlns="http://www.w3.org/2000/svg"
						width="75"
						height="75"
						viewBox="0 0 24 24"
					>
						<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
					</svg>
				</button>
			</div>
		</div>
	);
}

export default Gallery;
