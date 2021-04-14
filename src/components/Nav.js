import React from 'react';
import PropTypes from 'prop-types';
import vorah from '../images/vorah.png';
import johnny from '../images/johnny.png';
import kabal from '../images/kabal.png';
import kung from '../images/kung.png';
import stryker from '../images/stryker.png';
import Timer from './Timer';

function Nav(props) {
	const { targets, isGameStart, isGameOver, timer, setTimer } = props;
	const images = [vorah, johnny, kabal, kung, stryker];

	const generateTargetIcons = () =>
		targets.map((target, index) => (
			<div key={target.id} className='icon'>
				<img
					className={target.found ? 'img-found' : ''}
					src={images[index]}
					alt='target'
				/>
				<span className={target.found ? 'span-found' : ''}>{target.name}</span>
			</div>
		));

	return (
		<div className='nav'>
			<div className='icons'>{generateTargetIcons()}</div>
			<Timer
				isGameStart={isGameStart}
				isGameOver={isGameOver}
				timer={timer}
				setTimer={setTimer}
			/>
		</div>
	);
}

export default Nav;

Nav.propTypes = {
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
	isGameStart: PropTypes.bool.isRequired,
	isGameOver: PropTypes.bool.isRequired,
	timer: PropTypes.number.isRequired,
	setTimer: PropTypes.func.isRequired,
};
