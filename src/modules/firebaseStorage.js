import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCnMFqXHxtHt8iUAxTyPuGHllMqbiAdfUY',
	authDomain: 'wheres-waldo-eb53c.firebaseapp.com',
	projectId: 'wheres-waldo-eb53c',
	storageBucket: 'wheres-waldo-eb53c.appspot.com',
	messagingSenderId: '406404743427',
	appId: '1:406404743427:web:ee549343835ad5f31b2936',
	measurementId: 'G-0G1CLHVV24',
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else {
	firebase.app();
}

const firebaseStorage = (() => {
	const db = firebase.firestore();

	const generateTargetDataArray = async () => {
		const charactersData = await db
			.collection('characters')
			.orderBy('name')
			.get();

		return charactersData.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
	};

	const generateUserScoresArray = async () => {
		const userScoreData = await db
			.collection('scores')
			.orderBy('time', 'asc')
			.limit(10)
			.get();

		return userScoreData.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
	};

	const addNewHighScore = (name, time) => {
		db.collection('scores').add({ name, time });
	};

	return { generateTargetDataArray, generateUserScoresArray, addNewHighScore };
})();

export default firebaseStorage;
