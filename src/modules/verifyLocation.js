const verifyLocation = (characterLocation, mouseLocation) => {
	const { x, y } = characterLocation;
	const { relativeX, relativeY } = mouseLocation;
	const clickDistance = 60;

	if (
		x - clickDistance <= relativeX &&
		relativeX <= x + clickDistance &&
		y - clickDistance <= relativeY &&
		relativeY <= y + clickDistance
	) {
		return true;
	}

	return false;
};

export default verifyLocation;
