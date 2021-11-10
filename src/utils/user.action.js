import { userConstants } from "../constants";

export const isUserLoggedIn = () => {
	return async (dispatch) => {
		const tokenObj = JSON.parse(window.sessionStorage.getItem("token"));
		if (tokenObj) {
			const token = tokenObj.token;
			const user = JSON.parse(window.sessionStorage.getItem("user"));
			dispatch({
				type: userConstants.SIGNIN_SUCCESS,
				payload: {
					token,
					user,
				},
			});
		} else {
			dispatch({
				type: userConstants.SIGNIN_FAILURE,
				payload: {
					error: "Failed to login",
				},
			});
		}
	};
};
