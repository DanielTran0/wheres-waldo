import React, { useEffect, useState } from 'react';
import './App.css';
import ImageBoard from './components/ImageBoard';
import Nav from './components/Nav';
import firebaseStorage from './modules/firebaseStorage';
import verifyLocation from './modules/verifyLocation';

function App() {
	const [targets, setTargets] = useState([]);

	useEffect(async () => {
		const targetData = await firebaseStorage.generateTargetDataArray();

		setTargets(targetData);
	}, []);

	const targetFound = (characterLocation, mouseLocation) => {
		if (!verifyLocation(characterLocation, mouseLocation)) return false;
	};

	return (
		<div className='app'>
			<Nav targets={targets} />
			<ImageBoard targets={targets} targetFound={targetFound} />
		</div>
	);
}

export default App;
