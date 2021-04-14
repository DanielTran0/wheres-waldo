import React, { useEffect, useState } from 'react';
import './App.css';
import ImageBoard from './components/ImageBoard';
import Nav from './components/Nav';
import PageOverlay from './components/PageOverlay';
import Scores from './components/Scores';
import firebaseStorage from './modules/firebaseStorage';
import verifyLocation from './modules/verifyLocation';

function App() {
	const [isGameStart, setIsGameStart] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [targets, setTargets] = useState([]);
	const [timer, setTimer] = useState(0);
	const [userScores, setUserScores] = useState([]);

	const startGame = () => {
		setIsGameStart(true);
	};

	const checkForGameOver = () => {
		if (targets.every((target) => target.found)) {
			setIsGameOver(true);
		}
	};

	const restartGame = () => {
		const resetTargets = [...targets];

		setIsGameStart(false);
		setIsGameOver(false);
		setTargets(resetTargets.map((target) => ({ ...target, found: false })));
		setTimer(0);
	};

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

	useEffect(async () => {
		const targetData = await firebaseStorage.generateTargetDataArray();

		setTargets(targetData);
	}, []);

	useEffect(async () => {
		if (!isGameOver && !isGameOver) {
			const userScoresData = await firebaseStorage.generateUserScoresArray();
			setUserScores(userScoresData);
		}
	}, [isGameStart, isGameOver]);

	return (
		<div className='app'>
			<PageOverlay isGameStart={isGameStart} startGame={startGame} />
			<Scores
				isGameStart={isGameStart}
				isGameOver={isGameOver}
				timer={timer}
				restartGame={restartGame}
				userScores={userScores}
			/>
			<Nav
				targets={targets}
				isGameStart={isGameStart}
				isGameOver={isGameOver}
				timer={timer}
				setTimer={setTimer}
			/>
			<ImageBoard
				targets={targets}
				targetFound={targetFound}
				isGameStart={isGameStart}
				isGameOver={isGameOver}
				checkForGameOver={checkForGameOver}
			/>
		</div>
	);
}

export default App;
