import WatchlistActions from "../actions/watchlistActions";

export const WATCHLIST_INITIAL_STATE = {
	watchlist: [],
	loading: true,
};

export const watchlistReducer = (state, action) => {
	// filtered watchlist
	const { payload } = action;
	switch (action.type) {
		case WatchlistActions.WATCHLIST_CHANGED:
			return {
				...state,
				loading: false,
				watchlist: payload,
			};
		case WatchlistActions.LOADED_REQUEST:
			return {
				...state,
				loading: true,
			};
		default:
			throw new Error("Listing action is unknown.");
	}
};
