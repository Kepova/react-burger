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

//получение ингредиентов
export function getIngredients() {
    return function (dispatch) {
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
                    err: err
                })
            })
    }
};

//получение инфо о заказе
export function getInfoOrder(dataIngredient, token) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER
        })
        createOrder(dataIngredient, token)
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
                dispatch({
                    type: GET_ORDER_FAILED,
                    err: err
                })
            })
    }
};

// ингредиенты в конструктор
export const ingredientsConstructor = (dataConstructor, dataBun) => ({
    type: INGREDIENTS_CONSTRUCTOR,
    data: dataConstructor,
    bun: dataBun
});

// подсчет суммы заказа
export const calculateSumOrder = () => ({
    type: SUM_ORDER
});

// записать текущий ингредиент
export const showCurrentIngredient = (IdCurrentIngredient) => ({
    type: CURRENT_INGREDIENT,
    id: IdCurrentIngredient
});

// закрыть модалку
export const closeModal = () => ({
    type: CLOSE_MODAL
});

// перенести начинку
export const draggedFilling = (ingredient) => ({
    type: DRAG_FILLING,
    ingredient: ingredient
});

// добавить начинку в бургер
export const dropFilling = (ingredient) => {
    if (ingredient.type !== 'bun') ingredient = { ...ingredient, idConstructor: uuidv4() };
    return {
        type: DROP_FILLING,
        ingredient: ingredient
    }
};

//удалить ингредиент из конструктора бургера
export const deleteIngredient = (ingredientDelete) => ({
    type: DELETE_INGREDIENT,
    ingredientDelete: ingredientDelete
});

//поменять местами ингредиенты
export const changPlaceInConstructor = (dragIndex, hoverIndex) => ({
    type: CHANG_PLACE,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
});

//добавьте ингредиенты в заказ
export const informAddFilling = () => ({
    type: INFORM_ADD_FILLING
});