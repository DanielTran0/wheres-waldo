import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import formattedTime from '../modules/formatTIme';

function Timer(props) {
	const { isGameStart, isGameOver, timer, setTimer } = props;
	const countRef = useRef(null);

	const handleStart = () => {
		countRef.current = setInterval(() => {
			setTimer((prevTimer) => prevTimer + 1);
		}, 1000);
	};

	const handleStop = () => {
		clearInterval(countRef.current);
	};

	useEffect(() => {
		if (isGameStart && !isGameOver && timer === 0) handleStart();
		if (isGameOver) handleStop();
	}, [isGameStart, isGameOver]);

	return (
		<div className='timer'>
			<p>{formattedTime(timer)}</p>
		</div>
	);
}

export default Timer;

Timer.propTypes = {
	isGameStart: PropTypes.bool.isRequired,
	isGameOver: PropTypes.bool.isRequired,
	timer: PropTypes.number.isRequired,
	setTimer: PropTypes.func.isRequired,
};
