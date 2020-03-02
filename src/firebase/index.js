import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyCSvDEYrjUERfrDIJNrrq8QAB1eqmtAK6k',
	authDomain: 'just-vote-it.firebaseapp.com',
	databaseURL: 'https://just-vote-it.firebaseio.com',
	projectId: 'just-vote-it',
	storageBucket: 'just-vote-it.appspot.com',
	messagingSenderId: '574104186954',
	appId: '1:574104186954:web:a18b8f40e1fde2abb036b3',
	measurementId: 'G-3M2LTPCLKZ'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
