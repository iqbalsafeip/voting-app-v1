import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createVote as _createVote } from '../../../store/actions/vote';
import ButtonSubmit from '../../molecules/buttonSubmit';
const defaultURL =
	'https://firebasestorage.googleapis.com/v0/b/just-vote-it.appspot.com/o/empty.svg?alt=media&token=00817478-af3f-4069-a4b8-bb13ae54d0c0';

class CreateVote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createdBy: this.props.currUser.uid,
			title: '',
			id: new Date().getTime(),
			votingList: [
				{
					image: defaultURL,
					name: '',
					votedBy: 0
				},
				{
					image: defaultURL,
					name: '',
					votedBy: 0
				}
			]
		};
	}

	UNSAFE_componentWillMount() {
		if (!this.props.currUser.uid) {
			this.props.history.push('/');
		}
		window.document.title = 'Create Vote';
	}

	plusVote = () => {
		if (this.state.votingList.length >= 4) {
			this.setState({
				message: 'Max Vote Just 4 Thing'
			});
		} else {
			this.setState((state) => {
				const template = {
					image: defaultURL,
					name: '',
					votedBy: 0
				};
				const newData = (state.votingList = [ ...state.votingList, template ]);
				return {
					votingList: newData
				};
			});
		}
	};

	onChange = ({ value, index }) => {
		this.setState((state) => {
			const newList = state.votingList.map(
				(voting, i) =>
					i === index
						? {
								...voting,
								name: value
							}
						: voting
			);
			return {
				votingList: newList
			};
		});
	};

	handleCreate = () => {
		const { votingList, id, createdBy, title } = this.state;
		const data = {
			createdBy: this.props.currUser.uid,
			title,
			id,
			votingList,
			participe: []
		};
		console.log(data);
		let res = false;
		votingList.map((vote) => {
			if (vote.name !== '') {
				return (res = true);
			} else {
				return false;
			}
		});
		if (res && title !== '') {
			this.props.handleCreateVote(data).then(() => {
				this.props.history.push(`/vote/${id}/edit`);
			});
		}
	};

	render() {
		return (
			<React.Fragment>
				<nav className="navbar navbar-light bg-light shadow">
					<div className="container">
						<Link className="btn btn-info" to="/">
							Back
						</Link>
					</div>
				</nav>
				<div className="container">
					<input
						type="text"
						value={this.state.title}
						placeholder="title here..."
						className="form-control col-12 mt-4 mb-3"
						onChange={(e) => this.setState({ title: e.target.value })}
					/>
					{this.state.message ? <p className="text-danger text-center mb-3">{this.state.message}</p> : null}
					<div className="row">
						{this.state.votingList.map((vote, i) => {
							return (
								<div className="card col-11 mb-3 col-lg-5 mx-auto px-2 py-2 shadow" key={i}>
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
										<input
											className="form-control mt-auto "
											value={vote.name}
											onChange={(e) => this.onChange({ value: e.target.value, index: i })}
											placeholder="name here..."
										/>
									</div>
								</div>
							);
						})}
					</div>
					<div className="row mt-1">
						<button className="btn btn-info mx-auto rounded-pill" onClick={this.plusVote}>
							<img src={require('../../../images/icons/plus-circle.svg')} />
						</button>
					</div>
					<div className="row my-3 justify-content-center">
						<ButtonSubmit
							variant="info"
							isLoading={this.props.isLoading}
							onClick={this.handleCreate}
							text="Create Vote"
						/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const MapStateToProps = (state) => ({
	currUser: state.currUser,
	isLoading: state.isLoading
});

const MapDispatchToProps = (dispatch) => ({
	handleCreateVote: (value) => dispatch(_createVote(value))
});

export default connect(MapStateToProps, MapDispatchToProps)(CreateVote);
