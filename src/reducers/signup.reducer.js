import { userConstants } from "../constants";

const initState = {
	message: "",
	loading: false,
	error: null,
};

const signupReducer = (state = initState, action) => {
	switch (action.type) {
		case userConstants.SIGNUP_REQUEST:
			state = {
				...state,
				loading: true,
			};
			break;

		case userConstants.SIGNUP_SUCCESS:
			state = {
				...state,
				message: action.payload.message,
				loading: false,
			};
			break;
		case userConstants.SIGNUP_FAILURE:
			state = {
				...state,
				error: action.payload.error,
				loading: false,
			};
			break;
	}

	return state;
};

export default signupReducer;
