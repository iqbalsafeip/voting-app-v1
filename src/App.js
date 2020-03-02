import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import ListVoting from './components/pages/ListVoting';
import Navbar from './components/molecules/Navbar';
import { UserRoute, AuthRoute } from './components/Route';
import VotingEdit from './components/pages/VotingEdit';
import Voting from './components/pages/Voting';
import CreateVote from './components/pages/CreateVote';
import Footer from './components/molecules/Footer';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<AuthRoute path="/login" component={Login} />
				<AuthRoute path="/register" component={Register} />
				<UserRoute exact={true} path="/vote/:id/voting" component={Voting} />
				<UserRoute exact={true} path="/vote/:id/edit" component={VotingEdit} />
				<UserRoute exact={true} path="/vote/create" component={CreateVote} />
				<Route path="">
					<Navbar />
					<UserRoute exact path="/" component={Home} />
					<UserRoute exact path="/vote" component={ListVoting} />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
