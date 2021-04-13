import React from 'react';
import PropTypes from 'prop-types';
import vorah from '../images/vorah.png';
import johnny from '../images/johnny.png';
import kabal from '../images/kabal.png';
import kung from '../images/kung.png';
import stryker from '../images/stryker.png';

function Nav(props) {
	const images = [vorah, johnny, kabal, kung, stryker];

	const generateTargetIcons = () =>
		props.targets.map((target, index) => (
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
};
