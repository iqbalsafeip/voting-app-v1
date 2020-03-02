import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVotes } from '../../../store/actions/vote';

export class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roomID: '',
			message: null
		};
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { roomID } = this.state;
		if (roomID !== '') {
			this.props.history.push(`/vote/${roomID}/voting`);
		} else {
			this.setState({
				message: 'fill the input field!'
			});
		}
	};

	UNSAFE_componentWillMount() {
		window.document.title = 'Main';
		const user = localStorage.getItem('user');
		this.props.setRecentUser(JSON.parse(user));
		this.props.getAllVotes();
	}

	render() {
		const { currUser } = this.props;
		const { message } = this.state;
		return (
			<div className="d-flex align-items-center justify-content-between flex-column pt-5">
				<div className="card card-body shadow-lg rounded col-lg-4 col-md-6 my-4 col-10 px-5">
					<div className="row mt-auto">
						<div
							className="rounded-circle"
							style={{
								width: 70,
								height: 70,
								backgroundColor: 'blue',
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundImage: `url(${currUser.photoURL})`
							}}
						/>
						<h4 className="ml-3 mt-3">Hello {currUser.displayName}!</h4>
					</div>
					<p className="text-least mt-4">Have You Vote Today?</p>
				</div>

				<form
					onSubmit={this.onSubmit}
					className="form-group card card-body col-lg-4 col-md-6 col-10 mt-5 shadow-lg rounded"
				>
					<h1 className="text-center my-4">Enter Vote ID</h1>
					{message ? <p className="text-danger text-center">{message}</p> : null}
					<input
						type="text"
						className="form-control my-3 mt-3 rounded-pill"
						placeholder="Enter Vote Id Here..."
						onChange={(e) => this.setState({ roomID: e.target.value })}
						autoFocus
					/>
					<button type="submit" className="btn btn-primary rounded-pill mb-2">
						Enter
					</button>
				</form>
			</div>
		);
	}
}

const MapStateToProps = (state) => ({
	currUser: state.currUser
});

const MapDispatchToProps = (dispatch) => ({
	setRecentUser: (value) => dispatch({ type: 'SET_CURR_USER', value }),
	getAllVotes: (value) => dispatch(getVotes(value))
});

export default connect(MapStateToProps, MapDispatchToProps)(Home);
