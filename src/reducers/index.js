import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import categoryReducer from "./category.reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	category: categoryReducer,
});

export default rootReducer;
