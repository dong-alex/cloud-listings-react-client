import ListingsActions from "../actions/listingsActions";

export const LISTINGS_INITIAL_STATE = {
	listings: [],
	loading: true,
};

export const listingsReducer = (state, action) => {
	const { payload } = action;
	const { listings } = state;
	switch (action.type) {
		case ListingsActions.ADDED_LISTINGS:
			return {
				...state,
				loading: false,
				listings: [...listings, ...payload],
			};
		case ListingsActions.FETCHED_LISTINGS:
			return {
				...state,
				loading: false,
				listings: payload,
			};
		case ListingsActions.LOADED_REQUEST:
			return {
				...state,
				loading: true,
			};
		default:
			throw new Error("Listing action is unknown.");
	}
};
