import { useEffect, useReducer } from "react";
import {
	watchlistReducer,
	WATCHLIST_INITIAL_STATE,
} from "./reducers/watchlistReducer";
import WatchlistActions from "./actions/watchlistActions";
import { db, firebase } from "../../auth/firebase";

const useWatchlist = (props) => {
	const [state, dispatch] = useReducer(
		watchlistReducer,
		WATCHLIST_INITIAL_STATE
	);

	// destructure state - loading only really used during initial load or heavy loads
	const { watchlist, loading } = state;

	// initial fetch for listngs
	useEffect(() => {
		// should fetch data only associated to the user id
		const unsubscribe = db
			.collection("watchlist")
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
				dispatch({
					type: WatchlistActions.WATCHLIST_CHANGED,
					payload: data,
				});
			});

		return () => unsubscribe();
	}, []);

	const handleAddWatchlistItem = async (tagName, url) => {
		const data = {
			tagName,
			url,
			userId: firebase.auth().currentUser.uid,
		};

		const watchlistRef = db.collection("watchlist");

		const filtered = watchlist.filter(
			(item) => item.url === url || item.tagName === tagName
		);

		// there is a duplicate
		if (filtered.length > 0) {
			console.log("Duplicate entry being used");
			throw new Error("Duplicate entry. Please enter another url or tagName");
		}

		const result = await watchlistRef.add(data);

		return result.id;
	};

	const handleDeleteWatchlistItem = async (watchlistId) => {
		await db.collection("watchlist").doc(watchlistId).delete();
		console.log("Delete all the other listings assocaited with the watchlist");
	};

	return {
		watchlist,
		loading,
		onAddWatchlistItem: handleAddWatchlistItem,
		onDeleteWatchlistItem: handleDeleteWatchlistItem,
	};
};

export default useWatchlist;
