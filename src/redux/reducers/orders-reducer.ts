import {
    ALL_ORDERS,
    CURRENT_ORDER,
    GET_ORDER_ID,
    GET_ORDER_ID_SUCCESS,
    GET_ORDER_ID_FAILED
} from "../actions/actionTypes";
import { TActionOrder } from "../types/actions-order-types";
import { TOrderState } from "../types/orders-types";

export const initialState: TOrderState = {
    orders: null,
    currentOrder: null,
    getOrderFailed: false,
    getOrderRequest: false
}

export const ordersReducer = (state = initialState, action: TActionOrder): TOrderState => {
    switch (action.type) {
        case ALL_ORDERS:
            return {
                ...state,
                orders: action.payload
            };
        case CURRENT_ORDER:
            const order = state.orders ? state.orders.filter(el => el.number === action.payload) : null;
            return {
                ...state,
                currentOrder: order ? order[0] : null
            };
        case GET_ORDER_ID: {
            return {
                ...state,
                getOrderFailed: false,
                getOrderRequest: true
            };
        }
        case GET_ORDER_ID_SUCCESS: {
            return {
                ...state,
                currentOrder: action.payload,
                getOrderRequest: false
            };
        }
        case GET_ORDER_ID_FAILED: {
            return {
                ...state,
                getOrderFailed: action.err,
                getOrderRequest: false
            };
        }
        default:
            return state;
    }
}; 