import { getOrder } from "../../utils/api";
import {
    ALL_ORDERS,
    CURRENT_ORDER,
    GET_ORDER_ID,
    GET_ORDER_ID_SUCCESS,
    GET_ORDER_ID_FAILED
} from "../actions/actionTypes";
import { AppDispatch, AppThunk } from "../types";
import { TAllOrders, TShowCurrentOrder } from "../types/actions-order-types";
import { TOrder } from "../types/orders-types";

//записать все заказы
export const allOrders = (orders: TOrder[] | null): TAllOrders => ({
    type: ALL_ORDERS,
    payload: orders
});

//записать текущий заказ
export const showCurrentOrder = (numberCurrentOrder: number | null): TShowCurrentOrder => ({
    type: CURRENT_ORDER,
    payload: numberCurrentOrder
});

//получить данные заказа
export const getOrderById: AppThunk = (id) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_ID
        })
        getOrder(id)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_ID_SUCCESS,
                        payload: res.orders[0]
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_ID_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_ORDER_ID_FAILED,
                    err: err
                })
            })
    }
};