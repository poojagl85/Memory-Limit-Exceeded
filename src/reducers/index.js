import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import categoryReducer from "./category.reducer";
import signupReducer from "./signup.reducer";

const rootReducer = combineReducers({
	category: categoryReducer,
	signup: signupReducer,
	auth: authReducer,
});

export default rootReducer;
