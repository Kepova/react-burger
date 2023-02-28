import {
  GET_INGREDIENTS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_SUCCESS,
  CURRENT_INGREDIENT,
  CLOSE_MODAL,
  DRAG_FILLING,
  DROP_FILLING,
  DELETE_INGREDIENT
} from '../actions/actionTypes';

const initialState = {
  dataIngredients: [],
  getIngredientsFailed: null,
  getIngredientsRequest: false,
  currentIngredient: {},
  openModalIngredients: false
}

export function ingredientsReducer(state = initialState, action) {
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
    case CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.data,
        openModalIngredients: true
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        currentIngredient: {},
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
          dataIngredients: state.dataIngredients.map((item) =>
            (item._id === action.ingredient._id) ?
              { ...item, isInOrder: item.isInOrder + 2 }
              : item)
        }
      }
      return {
        ...state
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        dataIngredients: state.dataIngredients.map((item) =>
          item._id === action.ingredientDelete._id ?
            { ...item, isInOrder: item.isInOrder - 1 }
            : item)
      }
    }
    default: {
      return state
    }
  }
};