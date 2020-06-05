import firebase from "firebase/app";
import firebaseConfig from "./config";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

// if (window.location.hostname === "localhost") {
// 	db.settings({
// 		host: "localhost:5001",
// 		ssl: false,
// 	});
// }

export { db, firebase };
