import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import categoryReducer from "./category.reducer";
import signupReducer from "./signup.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
	signup: signupReducer,
});

export default rootReducer;
