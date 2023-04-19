import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../store';
import { TActionsIngredients, TActionsConstructor } from './actions-types';
import { TActionsAuth } from './actions-auth-types';
import { TWSActions } from './ws-types';
import { TActionOrder } from './actions-order-types';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения
export type TApplicationActions = TActionsIngredients |
    TActionsConstructor |
    TActionsAuth |
    TActionOrder |
    TWSActions;

// Типизация thunk'ов
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация dispatch для проверки отправляемого экшена
export type AppDispatch = typeof store.dispatch; 