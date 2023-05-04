import { initialState, ordersReducer } from './orders-reducer';
import * as types from '../actions/actionTypes';

describe('orders reducer', () => {
    it('should return the initial state orders reducer', () => {
        expect(ordersReducer(undefined, {} as any)).toEqual(initialState)
    });

    const orderTest = {
        ingredients: ['0', '1', '2'],
        name: 'name',
        _id: '0',
        status: 'status',
        number: 11,
        createdAt: 'string',
        updatedAt: 'string'
    }

    it('should handle ALL_ORDERS', () => {
        expect(ordersReducer(initialState, {
            type: types.ALL_ORDERS,
            payload: [orderTest]
        })).toEqual({
            ...initialState,
            orders: [orderTest]
        })
    });

    it('should handle CURRENT_ORDER', () => {
        expect(ordersReducer({ ...initialState, orders: [orderTest] }, {
            type: types.CURRENT_ORDER,
            payload: 11
        })).toEqual({
            ...initialState,
            orders: [orderTest],
            currentOrder: orderTest
        })
    });

    it('should handle GET_ORDER_ID', () => {
        expect(ordersReducer(initialState, {
            type: types.GET_ORDER_ID,
        })).toEqual({
            ...initialState,
            getOrderFailed: false,
            getOrderRequest: true
        })
    });

    it('should handle GET_ORDER_ID_SUCCESS', () => {
        expect(ordersReducer(initialState, {
            type: types.GET_ORDER_ID_SUCCESS,
            payload: orderTest
        })).toEqual({
            ...initialState,
            currentOrder: orderTest,
            getOrderRequest: false
        })
    });

    it('should handle GET_ORDER_ID_FAILED', () => {
        expect(ordersReducer(initialState, {
            type: types.GET_ORDER_ID_FAILED,
            err: 'error'
        })).toEqual({
            ...initialState,
            getOrderFailed: 'error',
            getOrderRequest: false
        })
    });
});
