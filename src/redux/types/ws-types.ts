import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../actions/actionTypes';
import { TOrder } from './orders-types';

export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onError: typeof WS_CONNECTION_ERROR,
    onClose: typeof WS_CONNECTION_CLOSED,
    onMessage: typeof WS_GET_MESSAGE,
    wsSendMessage: typeof WS_SEND_MESSAGE,
};

type TMessage = {
    success: boolean;
    orders: null | TOrder[];
    total: number,
    totalToday: number
}

export type TWSState = {
    wsConnected: boolean;
    messages: null | TMessage;

    error?: Event;
}

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSSendMessageAction;

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
    readonly payload: Event;
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    readonly payload: TMessage;
}

export interface IWSSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    readonly payload: { message: string };
}