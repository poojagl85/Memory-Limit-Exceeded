import { userConstants } from "../constants";

const initState = {
	token: null,
	authenticate: false,
	authenticating: false,
	message: "",
	error: null,
	user: {
		fullName: "",
		email: "",
		username: "",
	},
};

export default (state = initState, action) => {
	
	switch (action.type) {
		case userConstants.SIGNIN_REQUEST:
			state = {
				...state,
				authenticating: true,
			};
			break;
		case userConstants.SIGNIN_SUCCESS:
			state = {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				authenticate: true,
				authenticating: false,
			};
			break;
		case userConstants.SIGNIN_FAILURE:
			state = {
				...initState,
				error: action.payload.error,
				authenticating: false,
			};
	}

	return state;
};
