import WatchlistActions from "../actions/watchlistActions";

export const WATCHLIST_INITIAL_STATE = {
	watchlist: [],
};

export const watchlistReducer = (state, action) => {
	// filtered watchlist
	const { payload } = action;
	switch (action.type) {
		case WatchlistActions.WATCHLIST_CHANGED:
			return {
				...state,
				watchlist: payload,
			};
		default:
			throw new Error("Listing action is unknown.");
	}
};
