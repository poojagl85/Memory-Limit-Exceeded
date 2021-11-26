import { userConstants } from "../constants";

const initState = {
	authenticate: false,
	authenticating: false,
	message: "",
	error: null,
	user: {}
};

const authReducer = (state = initState, action) => {
	console.log(action);
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
			break;
		case userConstants.SIGNOUT_SUCCESS:
			state = {
				...initState,
			};
			break;
		case userConstants.SIGNOUT_FAILURE:
			state = {
				...state
			};
			break;
		case userConstants.USER_UPDATE:
			state = {
				...state,
				user: action.payload.user
			}
			break;
	}

	return state;
};

export default authReducer;
