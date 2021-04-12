import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mainImg from '../images/mk.jpg';

function ImageBoard(props) {
	const [isTargetingVisible, setIsTargetingVisible] = useState(false);
	const [mouseXY, setMouseXY] = useState({});

	const displayTargetingBox = (e) => {
		const imgTargeting = document.querySelector('.img-targeting');
		const { pageX, pageY } = e;

		imgTargeting.style.left = `${pageX - 50}px`;
		imgTargeting.style.top = `${pageY - 50}px`;

		if (isTargetingVisible) setIsTargetingVisible(false);
		else {
			const imgTargetingBoundaries = e.target.getBoundingClientRect();

			setIsTargetingVisible(true);
			setMouseXY({
				relativeX: pageX - imgTargetingBoundaries.left - window.scrollX,
				relativeY: pageY - imgTargetingBoundaries.top - window.scrollY,
			});
		}
	};

	const generateTargetingList = () =>
		props.targets.map((target) => (
			<li
				key={target.id}
				onClick={() => props.targetFound(target.location, mouseXY)}>
				{target.name}
			</li>
		));

	return (
		<div className='imageBoard'>
			<img
				className='img-main'
				src={mainImg}
				alt='mortal kombat'
				onClick={(e) => displayTargetingBox(e)}
			/>
			<div
				className='img-targeting'
				style={{ visibility: isTargetingVisible ? 'visible' : 'hidden' }}>
				<div className='img-box' />
				<ul>{generateTargetingList()}</ul>
			</div>
		</div>
	);
}

export default ImageBoard;

ImageBoard.propTypes = {
	targets: PropTypes.arrayOf(
		PropTypes.shape({
			found: PropTypes.bool,
			name: PropTypes.string,
			location: PropTypes.shape({
				x: PropTypes.number,
				y: PropTypes.number,
			}),
		})
	).isRequired,
	targetFound: PropTypes.func.isRequired,
};
