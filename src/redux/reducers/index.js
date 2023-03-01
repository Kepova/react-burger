import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredients-reducer";
import { constructorReducer } from "./constructor-reducer";

export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer
});