import React, { Component } from 'react';
import BG from '../../../images/icons/login.svg';
import { Link } from 'react-router-dom';
import { loginToAPI } from '../../../store/actions/auth.js';
import { connect } from 'react-redux';
import ButtonSubmit from '../../molecules/buttonSubmit';

export class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			message: null
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.type]: e.target.value
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;
		if (this.props.isLoading) {
			return false;
		}
		this.props
			.loginToAPIs({ email, password })
			.then((res) => {
				this.props.history.push('/');
			})
			.catch((err) => {
				this.setState({
					message: 'Password is wrong/email is not registered'
				});
			});
	};

	render() {
		const { email, password, message } = this.state;
		return (
			<div className="container pt-5">
				<div className="card shadow-lg my-auto text-center" style={{ borderRadius: 12 }}>
					<img src={BG} alt="" className="card-img-top my-3" />
					<div className="card-body">
						{message ? <p className="text-danger">{message}</p> : null}
						<form onSubmit={this.onSubmit} className="form-group">
							<input
								type="email"
								className="form-control my-3 rounded-pill"
								placeholder="Enter Email Here..."
								value={email}
								onChange={this.onChange}
								required
							/>
							<input
								type="password"
								className="form-control my-3 rounded-pill"
								placeholder="Enter Password Here..."
								value={password}
								onChange={this.onChange}
								required
							/>
							<ButtonSubmit text="Login" isLoading={this.props.isLoading} variant="primary" />
							<p>
								<Link className="text-muted mt-5" to="/register">
									Don't Have Account ? Goto Register
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const MapDispatchToProps = (dispatch) => ({
	loginToAPIs: (_payload) => dispatch(loginToAPI(_payload))
});

const MapStateToProps = (state) => ({
	isLoading: state.isLoading
});

export default connect(MapStateToProps, MapDispatchToProps)(Login);
