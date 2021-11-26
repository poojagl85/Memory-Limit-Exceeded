import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
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
					return <Redirect to={`/signin`} />;
				}
			}}
		/>
	);
}
