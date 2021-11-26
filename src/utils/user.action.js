import { userConstants } from "../constants";

export const isUserLoggedIn = () => {
	return async (dispatch) => {

		const user = window.localStorage.getItem("user");
		if (user) {
			const parseUser = JSON.parse(user);
			dispatch({
				type: userConstants.SIGNIN_SUCCESS,
				payload: {
					user: parseUser,
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
