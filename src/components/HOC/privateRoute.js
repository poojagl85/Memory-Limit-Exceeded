import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { userConstants } from "../../constants";

export default function PrivateRoute({ component: Component, ...rest }) {
	const dispatch = useDispatch();
	return (
		<Route
			{...rest}
			component={(props) => {
				const tokenObj = JSON.parse(
					window.localStorage.getItem("user")
				);
				if (tokenObj) {
					return <Component {...props} />;
				} else {
					dispatch({
						type: userConstants.SIGNIN_FAILURE,
						payload: {
							error: "Authorization Error",
						},
					});
					return <Redirect to={`/signin`} />;
				}
			}}
		/>
	);
}
