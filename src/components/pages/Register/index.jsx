import React, { Component } from 'react';
import BG from '../../../images/icons/register.svg';
import { Link } from 'react-router-dom';
import { registerToAPI } from '../../../store/actions/auth.js';
import { connect } from 'react-redux';
import SubmitButton from '../../molecules/buttonSubmit';

export class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			text: '',
			message: null
		};
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { email, password, text } = this.state;

		if (this.props.isLoading) {
			return false;
		}
		this.props
			.registToAPI({ email, password, displayName: text })
			.then((res) => {
				this.props.history.push('/login');
			})
			.catch((err) => {
				this.setState({
					message: err
				});
			});
	};

	onChange = (e) => {
		this.setState({
			[e.target.type]: e.target.value
		});
	};

	render() {
		const { email, password, text, message } = this.state;
		return (
			<div className="container pt-5">
				<div className="card shadow-lg my-auto text-center" style={{ borderRadius: 12 }}>
					<img src={BG} alt="" className="card-img-top my-3" />
					<div className="card-body">
						{message ? <p className="text-danger">{message}</p> : null}
						<form onSubmit={this.onSubmit} className="form-group">
							<input
								type="text"
								className="form-control my-3 rounded-pill"
								placeholder="Enter Name Here..."
								onChange={this.onChange}
								value={text}
								required
							/>
							<input
								type="email"
								className="form-control my-3 rounded-pill"
								placeholder="Enter Email Here..."
								onChange={this.onChange}
								value={email}
								required
							/>
							<input
								type="password"
								className="form-control my-3 rounded-pill"
								placeholder="Enter Password Here..."
								onChange={this.onChange}
								value={password}
								required
							/>
							<SubmitButton isLoading={this.props.isLoading} text="Register" variant="primary" />
							<p>
								<Link className="text-muted mt-2" to="/login">
									Already have account ? Goto Login
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
	registToAPI: (_payload) => dispatch(registerToAPI(_payload))
});

const MapStateToProps = (state) => ({
	isLoading: state.isLoading
});

export default connect(MapStateToProps, MapDispatchToProps)(Register);
