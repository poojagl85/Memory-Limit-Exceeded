import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/HOC/privateRoute";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "./services/axios";
import { categoryConstants } from "./constants";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get("category/getCategory")
			.then((res) => {
				const { message } = res.data;

				dispatch({
					type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
					payload: {
						message: message,
					},
				});
			})
			.catch((error) => {
				dispatch({
					type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
					payload: {
						error: error.response,
					},
				});
			});
	}, []);

	return (
		<div className="App">
			<Switch>
				<PrivateRoute path="/" exact component={Home} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signup" exact component={Signup} />
			</Switch>
		</div>
	);
}

export default App;
