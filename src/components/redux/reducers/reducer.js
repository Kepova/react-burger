import { v4 as uuidv4 } from 'uuid';

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
  CLOSE_MODAL,
  DRAG_FILLING,
  DROP_FILLING,
  DELETE_INGREDIENT,
  CHANG_PLACE
} from '../actions/actionTypes';

export const initialState = {
  dataIngredients: [],
  dataCurrentBurger: [],
  bunBurger: {},
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
        dataIngredients: action.dataIngredients.map(obj => ({ ...obj, isInOrder: 0 })),
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
        dataCurrentBurger: action.data,
        bunBurger: action.bun
      }
    }
    case SUMM_ORDER: {
      const summBun = state.bun ? (action.bun.price * 2) : 0;
      const summFilling = state.dataCurrentBurger.reduce((accumulator, currentObj) => {
        return accumulator + currentObj.price
      }, 0);

      return {
        ...state,
        totalPrice: summBun + summFilling
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
    case DRAG_FILLING: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          dataIngredients: state.dataIngredients.map((item) =>
            (item.type === 'bun') && (item._id !== action.ingredient._id) ?
              { ...item, isInOrder: 0 }
              : item)
        }
      }
      return {
        ...state,
        dataIngredients: state.dataIngredients.map((item) =>
          item._id === action.ingredient._id ?
            { ...item, isInOrder: item.isInOrder + 1 }
            : item)
      }
    }
    case DROP_FILLING: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          bunBurger: action.ingredient,
          dataIngredients: state.dataIngredients.map((item) =>
            (item._id === action.ingredient._id) ?
              { ...item, isInOrder: item.isInOrder + 2 }
              : item)
        }
      }
      return {
        ...state,
        dataCurrentBurger: state.dataCurrentBurger.concat({ ...action.ingredient, idConstructor: uuidv4() }),
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        dataCurrentBurger: state.dataCurrentBurger.filter(el => el.idConstructor !== action.ingredientDelete.idConstructor),
        dataIngredients: state.dataIngredients.map((item) =>
          item._id === action.ingredientDelete._id ?
            { ...item, isInOrder: item.isInOrder - 1 }
            : item)
      }
    }
    case CHANG_PLACE: {
      const { dragIndex, hoverIndex } = action;
      const updatedFillings = [...state.dataCurrentBurger];
      [updatedFillings[dragIndex], updatedFillings[hoverIndex]] = [updatedFillings[hoverIndex], updatedFillings[dragIndex]];

      return {
        ...state,
        dataCurrentBurger: updatedFillings
      }
    }
    default: {
      return state
    }
  }
};