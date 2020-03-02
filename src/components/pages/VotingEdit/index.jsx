import React from 'react';
import { connect } from 'react-redux';
import CardVoting from '../../molecules/CardVoting';
import { getVotes } from '../../../store/actions/vote';
import { Link } from 'react-router-dom';

class Voting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {}
		};
	}

	UNSAFE_componentWillMount() {
		window.document.title = 'Voting Edit';
		const { id } = this.props.match.params;
		console.log(id);
		this.setState(
			{
				data: this.props.votes.filter((vote) => {
					return vote.id.toString() === id.toString();
				})[0]
			},
			() => {
				if (!this.state.data) {
					this.props.getAllVote().then((res) => {
						const filtered = res.filter((vote) => vote.id.toString() === id)[0];
						console.log(filtered);
						const user = localStorage.getItem('user');
						const parsed = JSON.parse(user);
						if (filtered.createdBy !== parsed.uid) {
							window.location.href = `/vote/${filtered.id}/voting`;
						} else {
							this.setState({
								data: filtered
							});
						}
					});
				}
			}
		);
	}

	render() {
		const { data } = this.state;
		return (
			<React.Fragment>
				<nav className="navbar navbar-light bg-light shadow">
					<div className="container">
						<Link to="/vote" className="btn btn-info">
							Back
						</Link>
					</div>
				</nav>
				{data ? (
					<div>
						<h1 className="text-center mt-4 text-uppercase">{data.title}</h1>
						<div className="container">
							<div className="row text-center">
								<input className="form-control col-7 mx-auto" type="text" disabled value={data.id} />
								<button
									className="btn btn-info col-3 mx-auto"
									onClick={(e) => navigator.clipboard.writeText(data.id)}
								>
									Copy
								</button>
							</div>
							<div className="row">
								{data.votingList.length > 0 ? (
									data.votingList.map((vote, i) => {
										return <CardVoting key={i} {...vote} />;
									})
								) : (
									<p>Loading...</p>
								)}
							</div>
							<h6 className="text-center my-3">{data.participe.length} people have participated</h6>
							{console.log(data.participe)}
							<table className="table   shadow table-bordered rounded">
								<thead>
									<tr>
										<th scope="col">No</th>
										<th scope="col">Email</th>
										<th scope="col">Vote</th>
									</tr>
								</thead>
								<tbody>
									{data.participe.map((person, i) => {
										return (
											<tr key={i}>
												<th scope="row">{i + 1}</th>
												<td>{person.email}</td>
												<td>{person.vote}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<p className="text-center mt-4">Loading...</p>
				)}
			</React.Fragment>
		);
	}
}

const MapStateToProps = (state) => ({
	votes: state.votes,
	user: state.currUser
});

const MapDispatchToProps = (dispatch) => ({
	getAllVote: (value) => dispatch(getVotes(value))
});

export default connect(MapStateToProps, MapDispatchToProps)(Voting);
