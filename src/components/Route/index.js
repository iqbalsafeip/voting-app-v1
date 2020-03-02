import React from 'react';
import { Route } from 'react-router-dom';

export const UserRoute = ({ component: Component, path, exact }) => {
	const data = localStorage.getItem('user');
	if (data) {
		return <Route path={path} exact={exact} component={Component} />;
	} else {
		window.location.href = '/login';
	}
};

export const AuthRoute = ({ component: Component, path, exact }) => {
	const data = localStorage.getItem('user');
	if (!data) {
		return <Route path={path} exact={exact} component={Component} />;
	} else {
		window.location.href = '/';
	}
};
