import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from "./reducers/index";
import { socketMiddleware } from './middleware/socketMiddleware';
import { TWSStoreActions } from "./types/ws-types";
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from './actions/actionTypes';

const wsActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR,
    onClose: WS_CONNECTION_CLOSED,
    onMessage: WS_GET_MESSAGE,
    wsSendMessage: WS_SEND_MESSAGE,
};

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            socketMiddleware(wsActions)
        ))
);