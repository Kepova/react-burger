import { initialState, ingredientsReducer } from './ingredients-reducer';
import * as types from '../actions/actionTypes';
import { TCardIngredient } from '../../services/types';

describe('ingredients reducer', () => {
  it('should return the initial state ingredients reducer', () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(initialState)
  });
  const ingredientTestBun: TCardIngredient = {
    _id: '0',
    name: 'name',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image',
    image_mobile: 'image',
    image_large: 'image',
    __v: 0,
    isInOrder: 0
  };
  const ingredientTestMain: TCardIngredient = {
    _id: '1',
    name: 'name',
    type: 'main',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image',
    image_mobile: 'image',
    image_large: 'image',
    __v: 0,
    isInOrder: 0
  };
  const ingredientTestSauce: TCardIngredient = {
    _id: '2',
    name: 'name',
    type: 'sauce',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image',
    image_mobile: 'image',
    image_large: 'image',
    __v: 0,
    isInOrder: 0
  };
  const dataIngredientsTest: TCardIngredient[] = [
    ingredientTestBun,
    ingredientTestMain,
    ingredientTestSauce
  ]

  it('should handle GET_INGREDIENTS', () => {
    expect(ingredientsReducer(initialState, { type: types.GET_INGREDIENTS })).toEqual({
      ...initialState,
      getIngredientsRequest: true,
      getIngredientsFailed: null,
    })
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(ingredientsReducer(initialState, {
      type: types.GET_INGREDIENTS_SUCCESS,
      dataIngredients: dataIngredientsTest,
    })).toEqual({
      ...initialState,
      dataIngredients: dataIngredientsTest,
      getIngredientsRequest: false
    })
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(ingredientsReducer(initialState, {
      type: types.GET_INGREDIENTS_FAILED,
      err: 'error'
    })).toEqual({
      ...initialState,
      getIngredientsFailed: 'error',
      getIngredientsRequest: false
    })
  });

  it('should handle CURRENT_INGREDIENT', () => {
    expect(
      ingredientsReducer({ ...initialState, dataIngredients: dataIngredientsTest }, {
        type: types.CURRENT_INGREDIENT,
        id: ingredientTestMain._id
      })
    ).toEqual({
      ...initialState,
      dataIngredients: dataIngredientsTest,
      currentIngredient: ingredientTestMain
    })
  });

  it('should handle CLOSE_MODAL', () => {
    expect(ingredientsReducer({
      ...initialState, currentIngredient: ingredientTestMain
    }, { type: types.CLOSE_MODAL })).toEqual({
      ...initialState, currentIngredient: null
    })
  });

  it('should handle DRAG_FILLING', () => {
    const expectValue = dataIngredientsTest.map(el => (el._id !== ingredientTestMain._id) ? el : { ...el, isInOrder: el.isInOrder + 1 });
    expect(ingredientsReducer({
      ...initialState, dataIngredients: dataIngredientsTest
    }, {
      type: types.DRAG_FILLING,
      ingredient: ingredientTestMain
    })).toEqual({
      ...initialState, dataIngredients: expectValue
    })
  });

  it('should handle DRAG_FILLING with bun', () => {
    const expectValue = dataIngredientsTest.map(el => (el._id !== ingredientTestBun._id) ? el : { ...el, isInOrder: 2 });
    const dataIngredientsTestBun = dataIngredientsTest.map(el => (el.type === 'bun') ? { ...el, isInOrder: 2 } : el);
    expect(ingredientsReducer({
      ...initialState, dataIngredients: dataIngredientsTestBun
    }, {
      type: types.DRAG_FILLING,
      ingredient: ingredientTestBun
    })).toEqual({
      ...initialState, dataIngredients: expectValue
    })
  });

  it('should handle DROP_FILLING', () => {
    const expectValue = dataIngredientsTest.map(el => (el._id !== ingredientTestBun._id) ? el : { ...el, isInOrder: 2 });
    expect(ingredientsReducer({
      ...initialState, dataIngredients: dataIngredientsTest
    }, {
      type: types.DROP_FILLING,
      ingredient: { ...ingredientTestBun, idConstructor: 'uuid' }
    })).toEqual({
      ...initialState, dataIngredients: expectValue
    })
  });

  it('should handle DELETE_INGREDIENT', () => {
    const expectValue = dataIngredientsTest.map(el => (el._id !== ingredientTestMain._id) ? el : { ...el, isInOrder: el.isInOrder - 1 });
    expect(ingredientsReducer({
      ...initialState, dataIngredients: dataIngredientsTest
    }, {
      type: types.DELETE_INGREDIENT,
      ingredientDelete: { ...ingredientTestMain, idConstructor: 'uuid' }
    })).toEqual({
      ...initialState, dataIngredients: expectValue
    })
  });

}) 