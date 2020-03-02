import firebase from '../../firebase';

export const getAllOwnVote = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		let res = [];
		firebase
			.firestore()
			.collection('vote')
			.get()
			.then(async function(querySnapshot) {
				let filtered = [];
				let wait = await querySnapshot.forEach(function(doc) {
					res.push(doc.data());
					filtered = res.filter((vote) => vote.createdBy === data.id);
					dispatch({ type: 'SET_OWN_VOTES', value: filtered });
				});
				dispatch({ type: 'SET_FETCHED', value: true });
				resolve(filtered);
			})
			.catch((err) => reject(err.message));
	});
};

export const deleteVote = (data) => (dispatch) => {
	dispatch({ type: 'SET_ISLOADING', value: true });
	return new Promise((resolve, reject) => {
		const db = firebase.firestore().collection('vote');
		db
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					if (doc.data().id.toString() === data.id) {
						db
							.doc(doc.id)
							.delete()
							.then((res) => {
								dispatch({ type: 'SET_ISLOADING', value: false });
								dispatch({ type: 'DELETE_VOTE', value: data.id });
								resolve();
							})
							.catch((err) => {
								reject();
							});
					}
				});
			})
			.catch((err) => {
				reject();
			});
	});
};

export const doVote = (data) => (dispatch) => {
	// dispatch({ type: 'SET_ISLOADING', value: true });
	return new Promise((resolve, reject) => {
		const db = firebase.firestore().collection('vote');
		db
			.get()
			.then((snapshot) => {
				snapshot.forEach((doc) => {
					if (doc.data().id.toString() === data.id) {
						let votingList = doc.data().votingList;
						votingList = votingList.map(
							(vote, i) => (i === data.index ? { ...vote, votedBy: vote.votedBy + 1 } : vote)
						);
						let participe = doc.data().participe;
						let dataUser = {
							...data.user,
							vote: doc.data().votingList[data.index].name
						};
						participe = [ ...participe, dataUser ];
						db
							.doc(doc.id)
							.update({
								votingList,
								participe
							})
							.then(() => {
								dispatch({ type: 'SET_FETCHED', value: false });
								resolve(doc.data().votingList[data.index].name);
							});
					}
				});
			})
			.catch((err) => {
				reject();
			});
	});
};

export const getVotes = (data) => (dispatch) => {
	return new Promise((resolve, reject) => {
		let res = [];
		firebase
			.firestore()
			.collection('vote')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					res.push(doc.data());
				});
				dispatch({ type: 'SET_VOTES', value: res });
				resolve(res);
			})
			.catch((err) => reject(err.message));
	});
};

export const createVote = (data) => (dispatch) => {
	dispatch({ type: 'SET_ISLOADING', value: true });
	return new Promise((resolve, reject) => {
		firebase
			.firestore()
			.collection('vote')
			.add(data)
			.then(function(docRef) {
				dispatch({ type: 'ADD_VOTE', value: data });
				dispatch({ type: 'SET_ISLOADING', value: false });
				resolve();
			})
			.catch(function(error) {
				reject(error);
			});
	});
};
