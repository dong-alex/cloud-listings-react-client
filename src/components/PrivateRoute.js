import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { FirebaseContext } from "../auth/FirebaseAuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const { authenticated, loadingAuthState } = useContext(FirebaseContext);

	useEffect(() => {
		if (authenticated) {
			console.log("You are now authenticated!");
		} else {
			console.log("You are not authenticated");
		}
	}, [authenticated]);

	if (loadingAuthState && !authenticated) {
		return <div>Loading...</div>;
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
