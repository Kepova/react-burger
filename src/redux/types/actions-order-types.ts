import {
    CURRENT_ORDER,
    ALL_ORDERS,
    GET_ORDER_ID,
    GET_ORDER_ID_SUCCESS,
    GET_ORDER_ID_FAILED
} from "../actions/actionTypes";
import { TOrder } from "./orders-types";

export type TActionOrder =
    TAllOrders |
    TShowCurrentOrder |
    TGetOrder |
    TGetOrderSuccess |
    TGetOrderFailed;

export type TAllOrders = {
    readonly type: typeof ALL_ORDERS,
    readonly payload: TOrder[] | null
};

export type TShowCurrentOrder = {
    readonly type: typeof CURRENT_ORDER,
    readonly payload: number | null
};

export type TGetOrder = {
    readonly type: typeof GET_ORDER_ID
};

export type TGetOrderSuccess = {
    readonly type: typeof GET_ORDER_ID_SUCCESS,
    payload: TOrder
};

export type TGetOrderFailed = {
    readonly type: typeof GET_ORDER_ID_FAILED,
    err?: string
};