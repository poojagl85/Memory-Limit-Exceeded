import { categoryConstants } from "../constants";

const initState = {
	categories: [],
	loading: false,
	error: null,
};

export default (state = initState, action) => {
	switch (action.type) {
		case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
			state = {
				...state,
				loading: true.valueOf,
			};
			break;

		case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
			console.log(action.payload.categories);
			state = {
				...state,
				categories: action.payload.categories,
				loading: false,
			};
			break;
		case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
			state = {
				...initState,
				error: action.payload.error,
			};
			break;
	}

	return state;
};
