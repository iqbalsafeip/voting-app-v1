import firebase from '../../firebase';

export const registerToAPI = (data) => (dispatch) => {
	const { email, password, displayName } = data;
	dispatch({ type: 'SET_ISLOADING', value: true });
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				firebase
					.auth()
					.currentUser.updateProfile({
						displayName,
						photoURL:
							'https://firebasestorage.googleapis.com/v0/b/just-vote-it.appspot.com/o/undraw_male_avatar_323b.svg?alt=media&token=6c17bb5a-9c96-48a8-a09f-6cd2c50f0778'
					})
					.then(() => {
						dispatch({ type: 'SET_ISLOADING', value: false });
						resolve(res);
					});
			})
			.catch((err) => reject(err.message));
	});
};

export const loginToAPI = (data) => (dispatch) => {
	dispatch({ type: 'SET_ISLOADING', value: true });
	const { email, password } = data;
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((res) => {
				const { email, uid, displayName, photoURL } = res.user;
				localStorage.setItem('user', JSON.stringify({ email, uid, displayName, photoURL }));
				dispatch({ type: 'SET_CURR_USER', value: { email, uid, displayName, photoURL } });
				dispatch({ type: 'SET_ISLOADING', value: false });
				resolve(res);
			})
			.catch((err) => {
				dispatch({ type: 'SET_ISLOADING', value: false });
				reject(err.message);
			});
	});
};

export const isLoginToAPI = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				var displayName = user.displayName;
				var email = user.email;
				var emailVerified = user.emailVerified;
				var photoURL = user.photoURL;
				var isAnonymous = user.isAnonymous;
				var uid = user.uid;
				console.log(user);
				dispatch({ type: 'SET_CURR_USER', value: { email, displayName, photoURL, uid } });
				resolve(user);
			} else {
				reject(false);
			}
		});
	});
};

export const logoutToAPI = () => (dispatch) => {
	return new Promise((resolve, reject) => {
		firebase
			.auth()
			.signOut()
			.then((res) => {
				localStorage.removeItem('user');
				dispatch({ type: 'SET_CURR_USER', value: {} });
				resolve();
			})
			.catch((err) => reject());
	});
};
