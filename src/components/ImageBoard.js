import React, { useEffect, useState } from 'react';
import mainImg from '../images/mk.jpg';
import firebaseStorage from '../modules/firebaseStorage';

function ImageBoard() {
	const [isTargetingVisible, setIsTargetingVisible] = useState(false);
	const [targetList, setTargetList] = useState([]);
	const [mouseXY, setMouseXY] = useState({});
	const [foundMarkers, setFoundMarkers] = useState([]);

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
			console.log(
				`rX: ${
					pageX - imgTargetingBoundaries.left - window.scrollX
				}, X: ${pageX}`,
				`rY: ${
					pageY - imgTargetingBoundaries.top - window.scrollY
				}, Y: ${pageY}`
			);
		}
	};

	const handleListClick = async (name) => {
		const locationData = await firebaseStorage.checkCharacterLocation(name);
		const { x, y } = locationData;

		if (
			x - 60 <= mouseXY.relativeX &&
			mouseXY.relativeX <= x + 60 &&
			y - 60 <= mouseXY.relativeY &&
			mouseXY.relativeY <= y + 60
		) {
			console.log('hit');
		} else console.log('not it');
	};

	const placeFoundMarker = () => {};

	useEffect(async () => {
		const characters = await firebaseStorage.generateTargetArray();
		setTargetList(
			characters.map((character) => (
				<li key={character.id} onClick={() => handleListClick(character.name)}>
					{character.name}
				</li>
			))
		);
	}, [mouseXY]);

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
				<ul>{targetList}</ul>
			</div>
		</div>
	);
}

export default ImageBoard;
