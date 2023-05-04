import { wsReducer, initialState } from "./web-socet-reducer";
import * as types from '../actions/actionTypes';

describe('ws reducer', () => {
    it('should return the initial state ws reducer', () => {
        expect(wsReducer(undefined, {} as any)).toEqual(initialState)
    });

    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(wsReducer(initialState, { type: types.WS_CONNECTION_SUCCESS })).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: true
        })
    });

    it('should handle WS_CONNECTION_ERROR', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_ERROR,
            payload: {} as any
        })).toEqual({
            ...initialState,
            error: {},
            wsConnected: false
        })
    });
    
    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(wsReducer(initialState, {
            type: types.WS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            error: undefined,
            wsConnected: false,
            messages: null
        })
    });

    it('should handle WS_GET_MESSAGE', () => {
        expect(wsReducer(initialState, {
            type: types.WS_GET_MESSAGE,
            payload: {} as any
        })).toEqual({
            ...initialState,
            error: undefined,
            messages: {}
        })
    });
});