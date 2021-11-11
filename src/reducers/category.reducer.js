import { categoryConstants } from "../constants";

const initState = {
	categories: [],
	loading: false,
	error: null,
};

const categoryReducer = (state = initState, action) => {
	switch (action.type) {
		case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
			state = {
				...state,
				categories: action.payload.message.categories,
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

export default categoryReducer;
