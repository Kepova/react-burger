import { TWSState } from "../types/ws-types";
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../actions/actionTypes';
import { TWSActions } from "../types/ws-types";


const initialState: TWSState = {
    wsConnected: false,
    messages: null
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                messages: null
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                messages: action.payload
            };
        default:
            return state;
    }
}; 