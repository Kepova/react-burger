import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from '../actions/actionTypes';
import {
    IWSConnectionStart,
    IWSConnectionSuccessAction,
    IWSConnectionErrorAction,
    IWSConnectionClosedAction,
    IWSGetMessageAction,
    IWSSendMessageAction,

} from '../types/ws-types';

export const wsConnectionStart = (wsUrl: string): IWSConnectionStart => ({
    type: WS_CONNECTION_START,
    payload: wsUrl
});

export const wsConnectionSuccessAction = (): IWSConnectionSuccessAction => ({
    type: WS_CONNECTION_SUCCESS
});

export const wsConnectionErrorAction = (event: Event): IWSConnectionErrorAction => ({
    type: WS_CONNECTION_ERROR,
    payload: event
});

export const wsConnectionClosedAction = (): IWSConnectionClosedAction => ({
    type: WS_CONNECTION_CLOSED
})

export const wsGetMessageAction = (event: MessageEvent): IWSGetMessageAction => ({
    type: WS_GET_MESSAGE,
    payload: event.data
})

export const wsSendMessageAction = (message: string): IWSSendMessageAction => ({
    type: WS_SEND_MESSAGE,
    payload: { message }
})