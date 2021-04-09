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

	const generateTargetArray = async () => {
		const charactersData = await db
			.collection('characters')
			.orderBy('name')
			.get();

		return charactersData.docs.map((doc) => ({
			id: doc.id,
			name: doc.data().name,
		}));
	};

	const checkCharacterLocation = async (name) => {
		const character = await db
			.collection('characters')
			.where('name', '==', name)
			.get();
		return character.docs[0].data().location;
	};

	return { generateTargetArray, checkCharacterLocation };
})();

export default firebaseStorage;