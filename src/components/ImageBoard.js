import React, { useState } from 'react';
import PropTypes from 'prop-types';
import mainImg from '../images/mk.jpg';

function ImageBoard(props) {
	const DEFAULT_IMG_WIDTH = 2543;
	const DEFAULT_IMG_HEIGHT = 3169.89;
	const [isTargetingVisible, setIsTargetingVisible] = useState(false);
	const [mouseXY, setMouseXY] = useState({});
	const [browserWindowData, setBrowserWindowData] = useState({});
	const imgTargeting = document.querySelector('.img-targeting');

	const displayTargetingBox = (e) => {
		const { pageX, pageY } = e;

		imgTargeting.style.left = `${pageX - 50}px`;
		imgTargeting.style.top = `${pageY - 50}px`;

		if (isTargetingVisible) setIsTargetingVisible(false);
		else {
			const imgTargetingBoundaries = e.target.getBoundingClientRect();

			setIsTargetingVisible(true);
			setBrowserWindowData(imgTargetingBoundaries);
			setMouseXY({
				absoluteX: pageX,
				absoluteY: pageY,
				relativeX: pageX - imgTargetingBoundaries.left - window.scrollX,
				relativeY: pageY - imgTargetingBoundaries.top - window.scrollY,
			});
		}
	};

	const generateFoundMarker = () =>
		props.targets.map((target) => (
			<div key={target.id} className='foundMarker' data-id={target.id}>
				{target.name}
			</div>
		));

	const displayFoundMarker = (characterId) => {
		const markerDiv = document.querySelector(`[data-id='${characterId}']`);
		const { absoluteX, absoluteY } = mouseXY;

		markerDiv.style.visibility = 'visible';
		markerDiv.style.left = `${absoluteX}px`;
		markerDiv.style.top = `${absoluteY}px`;
	};

	const displayTargetFoundMessage = (isFound, characterName) => {
		const targetMessage = document.querySelector('.targetFoundMessage');

		targetMessage.style.visibility = 'visible';

		if (isFound) {
			targetMessage.style.backgroundColor = 'green';
			targetMessage.textContent = `You Found ${characterName}`;
		} else {
			targetMessage.style.backgroundColor = 'red';
			targetMessage.textContent = `That's not ${characterName}`;
		}

		setTimeout(() => {
			targetMessage.style.visibility = 'hidden';
		}, 3000);
	};

	const targetWindowCalculations = () => {
		const widthDifference =
			Math.floor((browserWindowData.width / DEFAULT_IMG_WIDTH) * 100) / 100;
		const heightDifference =
			Math.floor((browserWindowData.height / DEFAULT_IMG_HEIGHT) * 100) / 100;

		return { widthDifference, heightDifference };
	};

	const generateTargetingList = () =>
		props.targets.map(
			(target) =>
				!target.found && (
					<li
						key={target.id}
						onClick={() => {
							setIsTargetingVisible(false);

							if (
								!props.targetFound(
									target.location,
									mouseXY,
									target.id,
									targetWindowCalculations()
								)
							) {
								return displayTargetFoundMessage(false, target.name);
							}

							displayTargetFoundMessage(true, target.name);

							return displayFoundMarker(target.id);
						}}>
						{target.name}
					</li>
				)
		);

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
			<div className='foundMarkers'>{generateFoundMarker()}</div>
			<div className='targetFoundMessage' />
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
