import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/HOC/privateRoute";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { categoryConstants } from "./constants";
import { isUserLoggedIn } from "./utils/user.action";
import Question from "./pages/Question";
import PostQuestion from "./pages/PostQuestion";
import { api } from "./urlConfig";
import Category from "./pages/Category";

function App() {
	const auth = useSelector((state) => {
		return state.auth;
	});
	const dispatch = useDispatch();

	useEffect(() => {
		if (!auth.authenticate) {
			dispatch(isUserLoggedIn());
		}

		axios
			.get(`${api}/category/getCategory`)
			.then((res) => {
				const { categories } = res.data;

				dispatch({
					type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
					payload: {
						message: categories,
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
				<PrivateRoute path="/postQuestion" exact component={PostQuestion} />
				<Route path="/signin" exact component={Signin} />
				<Route path="/signup" exact component={Signup} />
				<Route path="/question/:slug" exact component={Question} />
				<Route path="/category/:slug" exact component={Category} />
			</Switch>
		</div>
	);
}

export default App;
