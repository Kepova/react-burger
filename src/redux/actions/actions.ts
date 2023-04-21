import { v4 as uuidv4 } from 'uuid';

import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INGREDIENTS_CONSTRUCTOR,
    SUM_ORDER,
    CURRENT_INGREDIENT,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    CLOSE_MODAL,
    DRAG_FILLING,
    DROP_FILLING,
    DELETE_INGREDIENT,
    CHANG_PLACE,
    INFORM_ADD_FILLING
} from './actionTypes';
import { getBurgerIngredients, createOrder } from '../../utils/api';

import { TCardConstructor, TCardIngredient } from '../../services/types';
import { AppDispatch, AppThunk } from '../types/index';
import {
    TCalculateSumOrder,
    TChangPlaceInConstructor,
    TCloseModal,
    TDeleteIngredient,
    TDraggedFilling,
    TDropFilling,
    TInformAddFilling,
    TIngredientsConstructor,
    TShowCurrentIngredient
} from '../types/actions-types';
import { TCreateOrder } from '../../services/api-types';
import { refreshTokenUser } from './actionsAuth';

//получение ингредиентов
export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS
        })
        getBurgerIngredients()
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        dataIngredients: res.data
                    })
                } else {
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                    err: `Возникла ошибка: ${err.status}`
                })
            })
    }
};

//получение инфо о заказе
export const getInfoOrder: AppThunk = ({ ingredients, token }: TCreateOrder) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER
        })
        createOrder({ ingredients, token })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        data: res
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_FAILED
                    })
                }
            })
            .catch(err => {
                err.json().then((err: any) => {
                    if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
                        dispatch(refreshTokenUser({ reRequest: getInfoOrder, data: ingredients }));
                    }
                    dispatch({
                        type: GET_ORDER_FAILED,
                        err: `Возникла ошибка: ${err.status}`
                    })
                })
                    .catch((err: any) => {
                        dispatch({
                            type: GET_ORDER_FAILED,
                            err: `Возникла ошибка: ${err.status}`
                        })
                    })
            })
    }
};

// ингредиенты в конструктор
export const ingredientsConstructor = (dataConstructor: ReadonlyArray<TCardConstructor>,
    dataBun: null | TCardConstructor): TIngredientsConstructor => ({
        type: INGREDIENTS_CONSTRUCTOR,
        data: dataConstructor,
        bun: dataBun
    });

// подсчет суммы заказа
export const calculateSumOrder = (): TCalculateSumOrder => ({
    type: SUM_ORDER
});

// записать текущий ингредиент
export const showCurrentIngredient = (IdCurrentIngredient: string | undefined): TShowCurrentIngredient => ({
    type: CURRENT_INGREDIENT,
    id: IdCurrentIngredient
});

// закрыть модалку
export const closeModal = (): TCloseModal => ({
    type: CLOSE_MODAL
});

// перенести начинку
export const draggedFilling = (ingredient: TCardIngredient): TDraggedFilling => ({
    type: DRAG_FILLING,
    ingredient: ingredient
});

// добавить начинку в бургер
export const dropFilling = (newIngredient: TCardIngredient): TDropFilling => {
    return {
        type: DROP_FILLING,
        ingredient: { ...newIngredient, idConstructor: uuidv4() }
    }
};

//удалить ингредиент из конструктора бургера
export const deleteIngredient = (ingredientDelete: TCardConstructor): TDeleteIngredient => ({
    type: DELETE_INGREDIENT,
    ingredientDelete: ingredientDelete
});

//поменять местами ингредиенты
export const changPlaceInConstructor = (dragIndex: number, hoverIndex: number): TChangPlaceInConstructor => ({
    type: CHANG_PLACE,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
});

//добавьте ингредиенты в заказ
export const informAddFilling = (): TInformAddFilling => ({
    type: INFORM_ADD_FILLING
});