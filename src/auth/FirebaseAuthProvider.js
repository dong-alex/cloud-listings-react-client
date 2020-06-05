import React, { useState, useEffect, createContext } from "react";
import {firebase} from "./firebase";
import axios from "axios";

axios.defaults.baseURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:5001/cloud-listings/us-central1/api"
		: "https://us-central1-cloud-listings.cloudfunctions.net/api";

axios.defaults.headers.post["Content-Type"] = "application/json";

export const FirebaseContext = createContext();

export const FirebaseAuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [authenticated, setAuthenticated] = useState(false);
	const [loadingAuthState, setLoadingAuthState] = useState(true);

	useEffect(() => {
		setAuthenticated(user !== null);
	}, [user]);

	// listener on the firebase
	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				setUser(user);
				setLoadingAuthState(false);
				user
					.getIdToken()
					.then((token) => {
						axios.defaults.headers.common = {
							Authorization: `Bearer ${token}`,
						};
					})
					.catch((err) => {
						console.log(err);
						console.log("Error grabbing token from user");
					});
			} else {
				console.log("No user currently signed");
				setUser(null);
				setLoadingAuthState(true);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<FirebaseContext.Provider
			value={{
				user,
				authenticated,
				loadingAuthState,
			}}
		>
			{children}
		</FirebaseContext.Provider>
	);
};

// use to bring context into the props
export const withFirebaseContext = (Component) => {
	return (props) => (
		<FirebaseContext.Consumer>
			{(state) => <Component {...props} context={state} />}
		</FirebaseContext.Consumer>
	);
};
