import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredients-reducer";
import { constructorReducer } from "./constructor-reducer";
import { authReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    authReducer
});