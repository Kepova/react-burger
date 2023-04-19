import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState, TApplicationActions } from '../types';

export const socketMiddleware = (): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let wsUrl = '';

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type } = action;

            if (type === 'WS_CONNECTION_START') {
                wsUrl = action.payload;
                // объект класса WebSocket
                socket = new WebSocket(wsUrl);
            }
            if (socket) {

                // открытие сокета
                socket.onopen = event => {
                    dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
                };

                // ошибка соединения
                socket.onerror = event => {
                    dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
                };

                // получение события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    const dataParse = JSON.parse(data);
                    dispatch({ type: 'WS_GET_MESSAGE', payload: dataParse });
                };
                // закрытие соединения
                socket.onclose = event => {
                    dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event });
                };

                if (type === 'WS_SEND_MESSAGE') {
                    const message = action.payload;
                    // отправить сообщение на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
}; 