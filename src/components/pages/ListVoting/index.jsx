import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllOwnVote, deleteVote } from '../../../store/actions/vote';
import ButtonSubmit from '../../molecules/buttonSubmit';

export class ListVoting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			votes: [],
			message: 'Loading...'
		};
	}

	async componentDidMount() {
		window.document.title = 'Vote List';
		const user = await localStorage.getItem('user');
		this.props.setRecentUser(JSON.parse(user));
		const { currUser, getAllVote, votes, isFetched, getAllVOTE } = this.props;
		getAllVOTE();
		if (!isFetched) {
			const res = await getAllVote({ id: currUser.uid }).then((res) => {});
		}

		if (votes.length === 0) {
			return this.setState({
				message: "You don't have any votes"
			});
		}
	}

	deleteHandle = (id) => {
		this.props.deleteVOTE({ id });
	};

	render() {
		const { message } = this.state;
		const { votes } = this.props;
		return (
			<div className="container">
				{votes.length > 0 ? (
					votes.map((vote, i) => {
						return (
							<div className="card card-body shadow my-3 col-md-6 col-lg-4 col-11 mx-auto" key={i}>
								<h3 className="text-uppercase">{vote.title}</h3>
								<p className="mt-2 badge badge-primary">ID :{vote.id}</p>
								<div className="row">
									<Link className="btn btn-primary rounded-pill ml-auto" to={`/vote/${vote.id}/edit`}>
										Check Vote
									</Link>
									<ButtonSubmit
										onClick={(e) => this.deleteHandle(vote.id.toString())}
										variant="danger"
										text="Delete"
										isLoading={this.props.isLoading}
									/>
								</div>
							</div>
						);
					})
				) : (
					<p className="text-center mt-5">{message}</p>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	getAllVote: (value) => dispatch(getAllOwnVote(value)),
	setRecentUser: (value) => dispatch({ type: 'SET_CURR_USER', value }),
	getAllVOTE: (value) => dispatch({ type: 'SET_VOTES', value }),
	deleteVOTE: (value) => dispatch(deleteVote(value))
});

const mapStateToProps = (state) => ({
	currUser: state.currUser,
	votes: state.votes,
	isFetched: state.fetched,
	isLoading: state.isLoading
});

export default connect(mapStateToProps, mapDispatchToProps)(ListVoting);
