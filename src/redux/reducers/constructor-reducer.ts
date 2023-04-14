import {
  INGREDIENTS_CONSTRUCTOR,
  SUM_ORDER,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  CLOSE_MODAL,
  DROP_FILLING,
  DELETE_INGREDIENT,
  CHANG_PLACE,
  INFORM_ADD_FILLING
} from '../actions/actionTypes';
import { TActionsConstructor } from '../types/actions-types';
import { TConstructorState } from '../types/constructor-reducer-types';

const initialState: TConstructorState = {
  dataCurrentBurger: [],
  bunBurger: null,
  dataOrder: null,
  totalPrice: 0,
  getOrderFailed: null,
  getOrderRequest: false,
  openModalOrder: false,
  messageAddFilling: null
}

export const constructorReducer = (state = initialState, action: TActionsConstructor): TConstructorState => {
  switch (action.type) {
    case INGREDIENTS_CONSTRUCTOR: {
      return {
        ...state,
        dataCurrentBurger: action.data,
        bunBurger: action.bun
      }
    }
    case SUM_ORDER: {
      const sumBun = state.bunBurger ? (state.bunBurger.price * 2) : 0;
      const sumFilling = state.dataCurrentBurger.reduce((accumulator, currentObj) => {
        return accumulator + currentObj.price
      }, 0);

      return {
        ...state,
        totalPrice: sumBun + sumFilling
      };
    }
    case GET_ORDER: {
      return {
        ...state,
        getOrderRequest: true,
        getOrderFailed: null,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        dataOrder: action.data,
        getOrderRequest: false,
        openModalOrder: true,
        dataCurrentBurger: [],
        bunBurger: null
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        getOrderFailed: action.err,
        getOrderRequest: false
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        dataOrder: null,
        openModalOrder: false
      }
    }
    case DROP_FILLING: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          bunBurger: action.ingredient,
          messageAddFilling: null
        }
      }
      return {
        ...state,
        dataCurrentBurger: state.dataCurrentBurger.concat(action.ingredient),
        messageAddFilling: null
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        dataCurrentBurger: state.dataCurrentBurger.filter(el => el.idConstructor !== action.ingredientDelete.idConstructor)
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
    case INFORM_ADD_FILLING: {
      return {
        ...state,
        messageAddFilling: 'Добавьте булочку и начинку в бургер'
      }
    }
    default: {
      return state
    }
  }
};