import React from 'react';
import { connect } from 'react-redux';
import { getVotes, doVote } from '../../../store/actions/vote';
import { Link } from 'react-router-dom';

class Voting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			message: 'Loading...',
			isVote: false,
			messageVoted: null,
			isLoading: false,
			vote: null
		};
	}

	fetchData = (id, user) => {
		this.props.getAllVote().then((res) => {
			const filtered = res.filter((vote) => vote.id.toString() === id)[0];
			if (!filtered) {
				this.setState({
					message: 'Room Not Found'
				});
			} else {
				let res = false;
				let vote = null;
				filtered.participe.map((person) => {
					if (person.uid === user.uid) {
						res = true;
						vote = person.vote;
					}
				});
				if (res) {
					this.setState(
						{
							isVote: true,
							messageVote: `You Have Already Voted ${vote}`
						},
						() => {
							this.setState({
								data: filtered
							});
						}
					);
				} else {
					this.setState({
						data: filtered
					});
				}
			}
		});
	};

	componentDidMount() {
		const { id } = this.props.match.params;
		let data = localStorage.getItem('user');
		let user = JSON.parse(data);
		this.fetchData(id, user);
		window.document.title = 'Just Vote It';
	}

	handleVote = async (index) => {
		const { id } = this.props.match.params;
		let data = await localStorage.getItem('user');
		let user = JSON.parse(data);
		this.setState({ isLoading: true });
		this.props.doVOTE({ id, index, user }).then((data) => {
			this.setState({ isVote: true, messageVote: `You Have Already Vote ${data}`, isLoading: false });
		});
	};

	render() {
		const { data, message, isVote, messageVote, isLoading } = this.state;
		return (
			<React.Fragment>
				<nav className="navbar navbar-light bg-light shadow">
					<div className="container">
						<Link to="/" className="btn btn-info">
							Back
						</Link>
					</div>
				</nav>
				{data ? (
					<div>
						<h1 className="text-center mt-4 text-uppercase">{data.title}</h1>
						<div className="container">
							{messageVote ? <p className="text-center text-danger">{messageVote}</p> : null}
							<div className="row">
								{data.votingList.length > 0 ? (
									data.votingList.map((vote, i) => {
										return (
											<div
												className="card col-11 col-lg-4 mx-lg-3 my-3 mx-auto px-2 py-2 shadow text-center"
												key={i}
											>
												<div
													className="card-img-top mx-auto"
													style={{
														width: 300,
														height: 300,
														backgroundColor: '#82b2ff',
														backgroundSize: 'cover',
														backgroundPosition: 'center',
														backgroundImage: `url(${vote.image})`
													}}
												/>
												<div className="card-body">
													<h5 className="card-title mt-auto">{vote.name}</h5>
													<button
														className="btn btn-primary col-12 rounded-pill mt-auto"
														onClick={(e) => this.handleVote(i)}
														disabled={isVote || isLoading}
													>
														{isLoading ? (
															<div>
																<span
																	className="spinner-grow spinner-grow-sm mr-2"
																	role="status"
																	aria-hidden="true"
																/>
																Wait..
															</div>
														) : (
															'Vote'
														)}
													</button>
												</div>
											</div>
										);
									})
								) : (
									<p>{message}</p>
								)}
							</div>
						</div>
					</div>
				) : (
					<p className="text-center mt-4">{message}</p>
				)}
			</React.Fragment>
		);
	}
}

const MapStateToProps = (state) => ({
	allVotes: state.allVotes,
	user: state.currUser
});

const MapDispatchToProps = (dispatch) => ({
	getAllVote: (value) => dispatch(getVotes(value)),
	doVOTE: (value) => dispatch(doVote(value))
});

export default connect(MapStateToProps, MapDispatchToProps)(Voting);
