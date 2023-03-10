import {
  INGREDIENTS_CONSTRUCTOR,
  SUMM_ORDER,
  GET_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
  CLOSE_MODAL,
  DROP_FILLING,
  DELETE_INGREDIENT,
  CHANG_PLACE,
  INFORM_ADD_FILLING
} from '../actions/actionTypes';

const initialState = {
  dataCurrentBurger: [],
  bunBurger: {},
  dataOrder: {},
  totalPrice: 0,
  getOrderFailed: null,
  getOrderRequest: false,
  openModalOrder: false,
  messageAddFilling: null
}

export function constructorReducer(state = initialState, action) {
  switch (action.type) {
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
        openModalOrder: true,
        dataCurrentBurger: [],
        bunBurger: {}
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