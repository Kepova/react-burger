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
import { TActionsIngredients } from '../types/actions-types';
import { TIngredientsState } from '../types/ingredients-reducer-types';

const initialState: TIngredientsState = {
  dataIngredients: [],
  getIngredientsFailed: null,
  getIngredientsRequest: false,
  currentIngredient: null,
  openModalIngredients: false
}

export function ingredientsReducer(state = initialState, action: TActionsIngredients): TIngredientsState {
  switch (action.type) {
    case GET_INGREDIENTS: {
      return {
        ...state,
        getIngredientsRequest: true,
        getIngredientsFailed: null,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        dataIngredients: action.dataIngredients.map(obj => ({ ...obj, isInOrder: 0 })),
        getIngredientsRequest: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        getIngredientsFailed: action.err,
        getIngredientsRequest: false
      };
    }
    case CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: state.dataIngredients.find(el => el._id === action.id),
      }
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        currentIngredient: null,
        openModalIngredients: false,
        dataIngredients: state.dataIngredients.map(obj => ({ ...obj, isInOrder: 0 }))
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