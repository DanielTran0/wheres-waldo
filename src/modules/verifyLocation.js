const verifyLocation = (
	characterLocation,
	mouseLocation,
	windowDataDifference
) => {
	const { widthDifference, heightDifference } = windowDataDifference;
	const { x, y } = characterLocation;
	const { relativeX, relativeY } = mouseLocation;
	const clickDistance = 120;

	const fixedX = widthDifference * x;
	const fixedY = heightDifference * y;

	let fixedClickDistance =
		((widthDifference + heightDifference) / 2) * clickDistance;

	if (fixedClickDistance < 40) fixedClickDistance = 40;

	if (
		fixedX - fixedClickDistance <= relativeX &&
		relativeX <= fixedX + fixedClickDistance &&
		fixedY - fixedClickDistance <= relativeY &&
		relativeY <= fixedY + fixedClickDistance
	) {
		return true;
	}

	return false;
};

export default verifyLocation;
