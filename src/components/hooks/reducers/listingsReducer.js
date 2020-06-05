import ListingsActions from "../actions/listingsActions";

export const LISTINGS_INITIAL_STATE = {
	listings: [],
};

export const listingsReducer = (state, action) => {
	const { payload } = action;
	switch (action.type) {
		case ListingsActions.ADDED_LISTINGS:
			return {
				...state,
				listings: [...listings, payload],
			};
		case ListingsActions.FETCHED_LISTINGS:
			return {
				...state,
				listings: [payload],
			};
		default:
			throw new Error("Listing action is unknown.");
	}
};
