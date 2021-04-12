import React from 'react';
import dVorah from '../images/d-vorah.png';
import johnny from '../images/johnny-cage.png';
import kabal from '../images/kabal.png';
import kung from '../images/kung-lao.png';
import stryker from '../images/stryker.png';

function Nav() {
	const images = [
		{ src: dVorah, name: "D'Vorah" },
		{ src: johnny, name: 'Johnny Cage' },
		{ src: kabal, name: 'Kabal' },
		{ src: kung, name: 'Kung Lao' },
		{ src: stryker, name: 'Stryker' },
	];

	const generateTargetIcons = () =>
		images.map((image) => (
			<div key={image.name} className='icon'>
				<img src={image.src} alt='target' />
				<span>{image.name}</span>
			</div>
		));

	return (
		<div className='nav'>
			<div className='icons'>{generateTargetIcons()}</div>
		</div>
	);
}

export default Nav;
