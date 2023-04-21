import {
    GET_INGREDIENTS,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    GET_ORDER,
    GET_ORDER_FAILED,
    GET_ORDER_SUCCESS,
    INGREDIENTS_CONSTRUCTOR,
    SUM_ORDER,
    CURRENT_INGREDIENT,
    CLOSE_MODAL,
    DRAG_FILLING,
    DROP_FILLING,
    DELETE_INGREDIENT,
    CHANG_PLACE,
    INFORM_ADD_FILLING
} from '../actions/actionTypes';
import { TCardConstructor, TCardIngredient, TDataOrder } from '../../services/types';

export type TActionsIngredients =
    TGetIngredients |
    TGetIngredientsSuccess |
    TGetIngredientsFailed |
    TShowCurrentIngredient |
    TCloseModal |
    TDraggedFilling |
    TDropFilling |
    TDeleteIngredient;

export type TActionsConstructor =
    TGetOrder |
    TGetOrderSuccess |
    TGetOrderFailed |
    TIngredientsConstructor |
    TCalculateSumOrder |
    TCloseModal |
    TDropFilling |
    TDeleteIngredient |
    TChangPlaceInConstructor |
    TInformAddFilling;

export type TGetIngredients = {
    readonly type: typeof GET_INGREDIENTS
};

export type TGetIngredientsSuccess = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    dataIngredients: ReadonlyArray<TCardIngredient>
};

export type TGetIngredientsFailed = {
    readonly type: typeof GET_INGREDIENTS_FAILED,
    err?: string
};

export type TGetOrder = {
    readonly type: typeof GET_ORDER
};

export type TGetOrderSuccess = {
    readonly type: typeof GET_ORDER_SUCCESS,
    data: TDataOrder
};

export type TGetOrderFailed = {
    readonly type: typeof GET_ORDER_FAILED,
    err?: string
};

export type TIngredientsConstructor = {
    readonly type: typeof INGREDIENTS_CONSTRUCTOR,
    readonly data: ReadonlyArray<TCardConstructor>,
    readonly bun: null | TCardConstructor
};

export type TCalculateSumOrder = {
    readonly type: typeof SUM_ORDER
};

export type TShowCurrentIngredient = {
    readonly type: typeof CURRENT_INGREDIENT,
    readonly id: string | undefined
};

export type TCloseModal = {
    readonly type: typeof CLOSE_MODAL
};

export type TDraggedFilling = {
    readonly type: typeof DRAG_FILLING,
    readonly ingredient: TCardIngredient
};

export type TDropFilling = {
    readonly type: typeof DROP_FILLING,
    readonly ingredient: TCardConstructor
};

export type TDeleteIngredient = {
    readonly type: typeof DELETE_INGREDIENT,
    readonly ingredientDelete: TCardConstructor
};

export type TChangPlaceInConstructor = {
    readonly type: typeof CHANG_PLACE,
    readonly dragIndex: number,
    readonly hoverIndex: number
};

export type TInformAddFilling = {
    readonly type: typeof INFORM_ADD_FILLING
};