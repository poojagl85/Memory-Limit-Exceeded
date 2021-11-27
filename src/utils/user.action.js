import { userConstants } from "../constants";

export const isUserLoggedIn = () => {
	return async (dispatch) => {

		const user = window.localStorage.getItem("user");

		if (user && document.cookie !== '') {
			console.log("In hi")
			const parseUser = JSON.parse(user);
			dispatch({
				type: userConstants.SIGNIN_SUCCESS,
				payload: {
					user: parseUser,
				},
			});
		} else {
			if (user) {
				window.localStorage.removeItem("user");
			}
			dispatch({
				type: userConstants.SIGNIN_FAILURE,
				payload: {
					error: "Authorization Error",
				},
			});
		}
	};
};
