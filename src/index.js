import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FirebaseAuthProvider } from "./auth/FirebaseAuthProvider";

ReactDOM.render(
	// <React.StrictMode>
	<FirebaseAuthProvider>
		<App />
	</FirebaseAuthProvider>,
	// </React.StrictMode>,
	document.getElementById("root")
);
