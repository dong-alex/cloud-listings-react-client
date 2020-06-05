import React, { useState, useContext, useEffect, useReducer } from "react";
import {
	watchlistReducer,
	WATCHLIST_INITIAL_STATE,
} from "./reducers/watchlistReducer";
import WatchlistActions from "./actions/watchlistActions";
import { db, firebase } from "../../auth/firebase";

import axios from "axios";

const useWatchlist = (props) => {
	const [state, dispatch] = useReducer(
		watchlistReducer,
		WATCHLIST_INITIAL_STATE
	);

	// destructure state
	const { watchlist } = state;

	// initial fetch for listngs
	useEffect(() => {
		// should fetch data only associated to the user id
		const unsubscribe = db
			.collection("watchlist")
			.where("userId", "==", firebase.auth().currentUser.uid)
			.onSnapshot((querySnapshot) => {
				let data = [];

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

	const handleDeleteWatchlistItem = (selectedItems) => {};

	const handleEditWatchlistItem = () => {};

	return {
		watchlist,
		onAddWatchlistItem: handleAddWatchlistItem,
		onDeleteWatchlistItem: handleDeleteWatchlistItem,
		onEditWatchlistItem: handleEditWatchlistItem,
	};
};

export default useWatchlist;
