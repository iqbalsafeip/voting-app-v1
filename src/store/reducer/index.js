const initState = {
	isLogin: false,
	currUser: {},
	myVote: [],
	voteRoom: [],
	isLoading: false,
	votes: new Array(),
	fetched: false,
	allVotes: []
};

const reducer = (state = initState, action) => {
	if (action.type === 'SET_CURR_USER') {
		return {
			...state,
			currUser: action.value
		};
	}

	if (action.type === 'SET_ISLOADING') {
		return {
			...state,
			isLoading: action.value
		};
	}

	if (action.type === 'DELETE_VOTE') {
		return {
			...state,
			votes: state.votes.filter((vote) => vote.id.toString() !== action.value)
		};
	}

	if (action.type === 'SET_VOTES') {
		return {
			...state,
			allVotes: action.value
		};
	}

	if (action.type === 'SET_OWN_VOTES') {
		return {
			...state,
			votes: action.value
		};
	}

	if (action.type === 'ADD_VOTE') {
		return {
			...state,
			votes: [ ...state.votes, action.value ]
		};
	}

	if (action.type === 'SET_FETCHED') {
		return {
			...state,
			fetched: action.value
		};
	}
	return state;
};

export default reducer;
