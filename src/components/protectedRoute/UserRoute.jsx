import React from 'react';
import { Route } from 'react-router-dom';

class UserRoute extends React.Component {
	render() {
		const { path, component: Component } = this.props;
		return <Route path={path} render={(props) => {}} />;
	}
}
