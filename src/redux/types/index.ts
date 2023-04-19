import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionCreator } from 'redux';
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
export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, RootState, unknown, TApplicationActions>>;

// Типизация dispatch для проверки отправляемого экшена
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
