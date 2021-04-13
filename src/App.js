import React, { useEffect, useState } from 'react';
import './App.css';
import ImageBoard from './components/ImageBoard';
import Nav from './components/Nav';
import PageOverlay from './components/PageOverlay';
import firebaseStorage from './modules/firebaseStorage';
import verifyLocation from './modules/verifyLocation';

function App() {
	const [targets, setTargets] = useState([]);
	const [isGameOver, setIsGameOver] = useState(true);

	const targetFound = (
		characterLocation,
		mouseLocation,
		characterId,
		windowDataDifference
	) => {
		if (
			!verifyLocation(characterLocation, mouseLocation, windowDataDifference)
		) {
			return false;
		}

		const targetIndex = targets.findIndex(
			(target) => target.id === characterId
		);
		const updatedTargetArray = [...targets];

		updatedTargetArray[targetIndex].found = true;
		setTargets(updatedTargetArray);

		return true;
	};

	const displayOverlay = () => {
		const overlay = document.querySelector('.pageOverlay');
		overlay.style.display = 'flex';
	};

	useEffect(async () => {
		const targetData = await firebaseStorage.generateTargetDataArray();

		setTargets(targetData);
		displayOverlay();
	}, []);

	return (
		<div className='app'>
			<PageOverlay displayOverlay={displayOverlay} />
			<Nav targets={targets} />
			<ImageBoard targets={targets} targetFound={targetFound} />
		</div>
	);
}

export default App;
