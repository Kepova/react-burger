import { combineReducers } from "redux";

import { ingredientsReducer } from "./ingredients-reducer";
import { constructorReducer } from "./constructor-reducer";
import { authReducer } from "./auth-reducer";
import { wsReducer } from "./web-socet-reducer";
import { ordersReducer } from "./orders-reducer";


export const rootReducer = combineReducers({
    ingredientsReducer,
    constructorReducer,
    authReducer,
    ordersReducer,
    wsReducer
});