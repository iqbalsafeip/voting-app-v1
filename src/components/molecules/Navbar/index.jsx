import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutToAPI } from '../../../store/actions/auth';
import { createVote } from '../../../store/actions/vote';
import Modal from '../Modal';
let routes = [ { name: 'Main', path: '/', exact: true }, { name: 'Your Vote', path: '/vote' } ];

export class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalShow: false
		};
	}

	logoutHandle = () => {
		this.props.logoutToAPIs().then(() => {
			window.location.href = '/login';
		});
	};

	handleClose = () => {
		this.setState({ modalShow: false });
	};

	render() {
		console.log(this.props);
		return (
			<React.Fragment>
				<nav className="navbar navbar-light bg-light shadow">
					<div className="container">
						<Link className="btn btn-primary rounded-pill" to="/vote/create">
							<img
								src={require('../../../images/icons/plus-circle.svg')}
								style={{ width: 18, marginBottom: 3 }}
							/>{' '}
							Vote
						</Link>
						<ul className="nav nav-pills mx-auto">
							{routes.map((route, i) => {
								return (
									<li key={i} className="nav-item">
										<NavLink
											className="nav-link rounded-pill"
											exact={route.exact}
											activeClassName="active"
											to={route.path}
										>
											{route.name}
										</NavLink>
									</li>
								);
							})}
						</ul>
						<button
							className="btn btn-danger rounded-pill"
							data-toggle="modal"
							data-target="#exitModal"
							type="button"
							onClick={(e) => this.setState({ modalShow: true })}
						>
							<img
								src={require('../../../images/icons/log-out.svg')}
								style={{ width: 18, marginBottom: 3 }}
							/>
						</button>
					</div>
				</nav>
				<Modal
					show={this.state.modalShow}
					handleClose={this.handleClose}
					TextModal="Are You Sure Wanna Logout?"
					Heading="Log out Alert!!"
					TextButton="Log out"
					onClick={this.logoutHandle}
				/>
			</React.Fragment>
		);
	}
}

const MapDispatchToProps = (dispatch) => ({
	logoutToAPIs: () => dispatch(logoutToAPI()),
	handleCreateVote: (value) => dispatch(createVote(value))
});

const MapStateToProps = (state) => ({
	currUser: state.currUser
});

export default connect(MapStateToProps, MapDispatchToProps)(Navbar);
