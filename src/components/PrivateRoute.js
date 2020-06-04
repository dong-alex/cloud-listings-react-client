import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "../auth/FirebaseAuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { authenticated, loadingAuthState } = useContext(FirebaseContext);

	useEffect(() => {
		if (authenticated) {
			console.log("You are now authenticated!");
		}
	}, [authenticated]);

	if (loadingAuthState) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	}

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				authenticated ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect
						to={{ pathname: "/login", state: { prevPath: rest.path } }}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
