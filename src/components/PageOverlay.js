import React from 'react';
import vorah from '../images/overlay/vorah.png';
import johnny from '../images/overlay/johnny.png';
import kabal from '../images/overlay/kabal.png';
import kung from '../images/overlay/kung.png';
import stryker from '../images/overlay/stryker.png';

function PageOverlay() {
	const images = [vorah, johnny, kabal, kung, stryker];
	const button = document.querySelector('.overlay-body button');
	const overlay = document.querySelector('.pageOverlay');

	const generateIcons = () =>
		images.map((image) => <img key={image} src={image} alt='character icon' />);

	const turnOffOverlay = () => {
		overlay.style.display = 'none';
	};

	const handleMouseEnter = () => {
		button.textContent = 'Finish Him';
	};

	const handleMouseLeave = () => {
		button.textContent = 'Start';
	};

	return (
		<div className='pageOverlay'>
			<div className='overlay-body'>
				<h1>Where&apos;s Waldo MK Edition</h1>
				<div className='overlay-images'>{generateIcons()}</div>
				<div className='overlay-message'>
					Find these characters as fast as possible
				</div>
				<button
					type='button'
					onClick={turnOffOverlay}
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
