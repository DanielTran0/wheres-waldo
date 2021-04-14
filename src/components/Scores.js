import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import formattedTime from '../modules/formatTIme';
import firebaseStorage from '../modules/firebaseStorage';

function Scores(props) {
	const { isGameStart, isGameOver, timer, restartGame, userScores } = props;
	const [inputValue, setInputValue] = useState('');
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const message1 = <p className='message'>New High Score</p>;
	const message2 = <p className='message'>Better Luck Next Time</p>;

	const displayUserScores = () =>
		userScores.map((score, index) => (
			<div key={score.id} className='userScore'>
				<p>{index + 1}</p>
				<p>{score.name}</p>
				<p>{formattedTime(score.time)}</p>
			</div>
		));

	const checkIfPlayerIsTopTen = () => {
		if (userScores.length === 0) return null;
		if (userScores[userScores.length - 1].time < timer) return false;

		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (inputValue === '') return;

		firebaseStorage.addNewHighScore(inputValue, timer);
		setIsFormSubmitted(true);
	};

	const handleChange = (e) => {
		setInputValue(`${e.target.value}`);
	};

	const generateForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Name'
				onChange={handleChange}
				value={inputValue}
			/>
			<button type='submit'>Submit</button>
		</form>
	);

	useEffect(() => {
		if (!isGameOver && !isGameOver) setIsFormSubmitted(false);
	}, [isGameStart, isGameOver]);

	const scoreDisplayLogic = () => {
		if (checkIfPlayerIsTopTen() && !isFormSubmitted) return generateForm();
		if (checkIfPlayerIsTopTen()) return message1;

		return message2;
	};

	return (
		<div className='scores' style={{ display: isGameOver ? 'flex' : 'none' }}>
			<div className='scores-body'>
				<div className='scores-body-upper'>
					<div className='highScores'>
						<h2>High Scores</h2>
						<div className='highScores-scores'>{displayUserScores()}</div>
					</div>
					<div className='playerDetails'>
						<h2>Time</h2>
						<p>{formattedTime(timer)}</p>
						{scoreDisplayLogic()}
						<button type='button' onClick={restartGame}>
							Play Again
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Scores;

Scores.propTypes = {
	isGameStart: PropTypes.bool.isRequired,
	isGameOver: PropTypes.bool.isRequired,
	timer: PropTypes.number.isRequired,
	restartGame: PropTypes.func.isRequired,
	userScores: PropTypes.arrayOf(
		PropTypes.shape({ name: PropTypes.string, time: PropTypes.number })
	).isRequired,
};
