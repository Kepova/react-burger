import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { baseReducer } from '../redux/reducers/reducer';

export const configureStore = (initialState) => {
    const store = createStore(
        baseReducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(
                thunkMiddleware
            ))
    );
    return store;
};
