import React from 'react';
import PropTypes from 'prop-types';
import vorah from '../images/overlay/vorah.png';
import johnny from '../images/overlay/johnny.png';
import kabal from '../images/overlay/kabal.png';
import kung from '../images/overlay/kung.png';
import stryker from '../images/overlay/stryker.png';

function PageOverlay(props) {
	const { isGameStart, startGame } = props;
	const images = [vorah, johnny, kabal, kung, stryker];

	const generateIcons = () =>
		images.map((image) => <img key={image} src={image} alt='character icon' />);

	const handleMouseEnter = (e) => {
		e.target.textContent = 'Finish Him';
	};

	const handleMouseLeave = (e) => {
		e.target.textContent = 'Start';
	};

	return (
		<div
			className='pageOverlay'
			style={{ display: !isGameStart ? 'flex' : 'none' }}>
			<div className='overlay-body'>
				<h1>Where&apos;s Waldo MK Edition</h1>
				<div className='overlay-images'>{generateIcons()}</div>
				<div className='overlay-message'>
					Find these characters as fast as possible
				</div>
				<button
					type='button'
					onClick={startGame}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}>
					Start
				</button>
				<a href='https://www.behance.net/gusmorais'>Image by Gus Morais</a>
			</div>
		</div>
	);
}

export default PageOverlay;

PageOverlay.propTypes = {
	isGameStart: PropTypes.bool.isRequired,
	startGame: PropTypes.func.isRequired,
};
