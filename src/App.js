import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import DashboardPage from "./components/pages/DashboardPage";
import AccountPage from "./components/pages/AccountPage";
import WatchlistPage from "./components/pages/WatchlistPage";
import NotificationPage from "./components/pages/NotificationPage";

import PrivateRoute from "./components/PrivateRoute";
import { FirebaseContext } from "./auth/FirebaseAuthProvider";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "0",
		height: "100%",
		width: "100%",
	},
}));

const App = (props) => {
	const { authenticated } = useContext(FirebaseContext);
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Router>
				<Switch>
					<Route
						path='/login'
						exact
						component={authenticated ? () => <Redirect to='/' /> : LoginPage}
					/>
					<Route
						path='/signup'
						exact
						component={authenticated ? () => <Redirect to='/' /> : SignupPage}
					/>
					<PrivateRoute path='/' exact component={DashboardPage} />
					<PrivateRoute
						path='/notifications'
						exact
						component={NotificationPage}
					/>
					<PrivateRoute path='/settings' exact component={AccountPage} />
					<PrivateRoute path='/watchlist' exact component={WatchlistPage} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
