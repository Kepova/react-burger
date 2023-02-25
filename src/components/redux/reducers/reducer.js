
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
} from '../actions/actionTypes';

export const initialState = {
  dataIngridients: [],
  dataCurrentBurger: [],
  currentIngredient: {},
  dataOrder: {},
  getIngredientsFailed: null,
  getIngredientsRequest: false,
  totalPrice: 0,
  getOrderFailed: null,
  getOrderRequest: false,
  openModalOrder: false,
  openModalIngredients: false
}

export function baseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        // Запрос начал выполняться
        getIngredientsRequest: true,
        // Сброс статус наличия ошибок от предыдущего запроса 
        getIngredientsFailed: null,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно
        dataIngridients: action.dataIngridients,
        getIngredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой 
        getIngredientsFailed: action.err,
        getIngredientsRequest: false
      };
    }
    case INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        dataCurrentBurger: action.data
      }
    }
    case SUMM_ORDER: {
      const currentSumm = action.data.reduce((accumulator, currentObj) => {
        return accumulator + currentObj.price
      }, 0);

      return {
        ...state,
        totalPrice: currentSumm
      };
    }
    case CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.data,
        openModalIngredients: true
      }
    }
    case GET_ORDER: {
      return {
        ...state,
        // // Запрос начал выполняться
        getOrderRequest: true,
        // Сбрасываем статус наличия ошибок от предыдущего запроса 
        getOrderFailed: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        // Запрос выполнился успешно
        dataOrder: action.data,
        getOrderRequest: false,
        openModalOrder: true
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        // Запрос выполнился с ошибкой 
        getOrderFailed: action.err,
        getOrderRequest: false
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        dataOrder: {},
        currentIngredient: {},
        openModalOrder: false,
        openModalIngredients: false
      }
    }
    default: {
      return state
    }
  }
};
