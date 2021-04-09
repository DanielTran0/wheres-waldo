import React, { useEffect, useState } from 'react';

function ImageBoard() {
  const [isTargetingVisible, setIsTargetingVisible] = useState(false);
  const [targetList, setTargetList] = useState([]);

  const displayTargetingBox = (e) => {
    const imgTargeting = document.querySelector('.img-target');
    const { pageX, pageY } = e;
    // const imgTargetingBoundaries = e.target.getBoundingClientRect();

    // const relativeX = pageX - imgTargetingBoundaries.left;
    // const relativeY = pageY - imgTargetingBoundaries.top;

    imgTargeting.style.left = `${pageX - 50}px`;
    imgTargeting.style.top = `${pageY - 50}px`;

    if (isTargetingVisible) setIsTargetingVisible(false);
    else setIsTargetingVisible(true);

    // console.log(`x: ${pageX}`, `y: ${pageY}`);
  };

  // const generateTargetList = async () => {
  // 	const locationsData = await db.collection('locations').get();

  // 	return locationsData.docs.map((doc) => (
  // 		<li key={doc.id}>{doc.data().name}</li>
  // 	));
  // };

  // useEffect(async () => {
  // 	const list = await generateTargetList();
  // 	setTargetList(list);
  // }, []);

  return (
    <div className='imageBoard'>
      <img
        className='img-main'
        src='./images/mk.jpg'
        alt='mortal kombat'
        onClick={(e) => displayTargetingBox(e)}
      />
      <div
        className='img-target'
        style={{ visibility: isTargetingVisible ? 'visible' : 'hidden' }}>
        <div className='img-box' />
        <ul>{targetList}</ul>
      </div>
    </div>
  );
}

export default ImageBoard;
