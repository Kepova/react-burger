import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    INGREDIENTS_CONSTRUCTOR,
    SUMM_ORDER,
    CURRENT_INGREDIENT,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    CLOSE_MODAL
} from './actionTypes';
import { getBurgerIngridients, createOrder } from '../../../utils/api';

//получение ингредиентов
export function getIngredients() {
    return function (dispatch) {

        dispatch({
            type: GET_INGREDIENTS
        })

        getBurgerIngridients()
            .then(res => {
                if (res && res.success) {
                    // Данные успешно получены, вызываем экшен для записи данных в хранилище
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        dataIngridients: res.data
                    })
                } else {
                    // Если ошибка, отправляем экшен об ошибке
                    dispatch({
                        type: GET_INGREDIENTS_FAILED
                    })
                }
            })
            .catch(err => {
                // Если сервер не вернул данных, отправляем экшен об ошибке
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                    err: err
                })
            })
    }
};

//получение инфо о заказе
export function getInfoOrder(dataIngredient) {
    return function (dispatch) {

        dispatch({
            type: GET_ORDER
        })

        createOrder(dataIngredient)
            .then(res => {
                if (res && res.success) {
                    // Данные успешно получены, вызываем экшен для записи данных в хранилище
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        data: res
                    })
                } else {
                    // Если ошибка, отправляем экшен об ошибке
                    dispatch({
                        type: GET_ORDER_FAILED
                    })
                }
            })
            .catch(err => {
                // Если сервер не вернул данных, отправляем экшен об ошибке
                dispatch({
                    type: GET_ORDER_FAILED,
                    err: err
                })
            })
    }
};

// ингредиенты в конструктор
export const ingredientsConstructor = (dataConstructor) => ({
    type: INGREDIENTS_CONSTRUCTOR,
    data: dataConstructor
});

// подсчет суммы заказа
export const calculateSummOrder = (dataOrder) => ({
    type: SUMM_ORDER,
    data: dataOrder
});

// записать текущий ингредиент
export const showCurrentIngredient = (currentIngredient) => ({
    type: CURRENT_INGREDIENT,
    data: currentIngredient
});

// закрыть модалку
export const closeModal = () => ({
    type: CLOSE_MODAL
});