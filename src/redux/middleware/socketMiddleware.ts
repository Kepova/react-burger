import type { Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState, TApplicationActions } from '../types';
import { TWSStoreActions } from '../types/ws-types';

export const socketMiddleware = (wsActions: TWSStoreActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let wsUrl = '';

        return next => (action: TApplicationActions) => {
            const { dispatch } = store;
            const { type } = action;
            const { wsInit,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage } = wsActions;

            if (type === wsInit) {
                wsUrl = action.payload;
                // объект класса WebSocket
                socket = new WebSocket(wsUrl);
            }
            if (socket) {

                // открытие сокета
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };

                // ошибка соединения
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };

                // получение события от сервера
                socket.onmessage = event => {
                    const { data } = event;
                    const dataParse = JSON.parse(data);
                    dispatch({ type: onMessage, payload: dataParse });
                };
                // закрытие соединения
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const message = action.payload;
                    // отправить сообщение на сервер
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    }) as Middleware;
}; 