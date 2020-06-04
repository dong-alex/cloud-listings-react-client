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
				</Switch>
			</Router>
		</div>
	);
};

export default App;
