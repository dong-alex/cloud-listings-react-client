import { useEffect, useReducer } from "react";
import {
	LISTINGS_INITIAL_STATE,
	listingsReducer,
} from "./reducers/listingsReducer";
import ListingsActions from "./actions/listingsActions";
import { db, firebase } from "../../auth/firebase";

// global state of the listings available to the user
const useListings = (props) => {
	const [state, dispatch] = useReducer(listingsReducer, LISTINGS_INITIAL_STATE);
	const { listings, loading } = state;

	useEffect(() => {
		const unsubscribe = db
			.collection("listings")
			.where("userId", "==", firebase.auth().currentUser.uid)
			.onSnapshot((querySnapshot) => {
				let data = [];
				console.log(`read ${querySnapshot.docs.length} docs`);

				querySnapshot.forEach((doc) => {
					data.push({
						id: doc.id,
						...doc.data(),
					});
				});
				console.log(data);
				dispatch({ type: ListingsActions.FETCHED_LISTINGS, payload: data });
			});
		return () => unsubscribe();
	}, []);

	return { listings, loading };
};

export default useListings;
