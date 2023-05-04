import { initialState, constructorReducer } from './constructor-reducer';
import * as types from '../actions/actionTypes';
import { TCardConstructor } from '../../services/types';

describe('constructor reducer', () => {
    it('should return the initial state constructor reducer', () => {
        expect(constructorReducer(undefined, {} as any)).toEqual(initialState)
    });

    const ingredientTestBun: TCardConstructor = {
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
        isInOrder: 0,
        idConstructor: '10'
    };
    const ingredientTestMain: TCardConstructor = {
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
        isInOrder: 0,
        idConstructor: '11'
    };
    const ingredientTestSauce: TCardConstructor = {
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
        isInOrder: 0,
        idConstructor: '12'
    };

    const dataConstructorTest: TCardConstructor[] = [
        ingredientTestMain,
        ingredientTestSauce
    ];

    const dataOrderTest = {
        success: true,
        name: 'name',
        order: {
            createdAt: 'string',
            ingredients: [...dataConstructorTest, ingredientTestBun],
            name: 'name',
            number: 111,
            owner: {
                createdAt: 'string',
                email: 'email',
                name: 'name',
                updatedAt: 'string',
            },
            price: 0,
            status: 'status',
            _id: '01',
            updatedAt: 'string',
        }
    };

    it('should handle INGREDIENTS_CONSTRUCTOR', () => {
        expect(constructorReducer(initialState, {
            type: types.INGREDIENTS_CONSTRUCTOR,
            data: dataConstructorTest,
            bun: ingredientTestBun
        })).toEqual({
            ...initialState,
            dataCurrentBurger: dataConstructorTest,
            bunBurger: ingredientTestBun,
        })
    });

    it('should handle SUM_ORDER', () => {
        const expectValue = ingredientTestMain.price +
            ingredientTestSauce.price +
            (ingredientTestBun.price * 2);
        expect(constructorReducer({
            ...initialState,
            dataCurrentBurger: dataConstructorTest,
            bunBurger: ingredientTestBun
        }, {
            type: types.SUM_ORDER
        })).toEqual({
            ...initialState,
            dataCurrentBurger: dataConstructorTest,
            bunBurger: ingredientTestBun,
            totalPrice: expectValue
        })
    });

    it('should handle GET_ORDER', () => {
        expect(constructorReducer(initialState, { type: types.GET_ORDER })).toEqual({
            ...initialState,
            getOrderRequest: true,
            getOrderFailed: null,
        })
    });

    it('should handle GET_ORDER_SUCCESS', () => {
        expect(constructorReducer({
            ...initialState,
            dataCurrentBurger: dataConstructorTest,
            bunBurger: ingredientTestBun,
            getOrderRequest: true,
            getOrderFailed: null,
        }, {
            type: types.GET_ORDER_SUCCESS,
            data: dataOrderTest
        })).toEqual({
            ...initialState,
            dataOrder: dataOrderTest,
            getOrderRequest: false,
            openModalOrder: true,
            dataCurrentBurger: [],
            bunBurger: null
        })
    });
    it('should handle GET_ORDER_FAILED', () => {
        expect(constructorReducer(initialState, {
            type: types.GET_ORDER_FAILED,
            err: 'error'
        })).toEqual({
            ...initialState,
            getOrderFailed: 'error',
            getOrderRequest: false
        })
    });

    it('should handle CLOSE_MODAL', () => {
        expect(constructorReducer({
            ...initialState,
            dataOrder: dataOrderTest,
            openModalOrder: true,
        }, { type: types.CLOSE_MODAL })).toEqual({
            ...initialState,
            dataOrder: null,
            openModalOrder: false
        })
    });

    it('should handle DROP_FILLING', () => {
        expect(constructorReducer(initialState, {
            type: types.DROP_FILLING,
            ingredient: ingredientTestSauce
        })).toEqual({
            ...initialState,
            dataCurrentBurger: [ingredientTestSauce],
        })
    });

    it('should handle DROP_FILLING with bun', () => {
        expect(constructorReducer(initialState, {
            type: types.DROP_FILLING,
            ingredient: ingredientTestBun
        })).toEqual({
            ...initialState,
            bunBurger: ingredientTestBun,
        })
    });

    it('should handle DELETE_INGREDIENT', () => {
        expect(constructorReducer({
            ...initialState,
            dataCurrentBurger: [ingredientTestSauce],
        }, {
            type: types.DELETE_INGREDIENT,
            ingredientDelete: ingredientTestSauce
        })).toEqual({
            ...initialState,
            dataCurrentBurger: [],
        })
    });

    it('should handle CHANG_PLACE', () => {
        expect(constructorReducer({
            ...initialState,
            dataCurrentBurger: [ingredientTestSauce,
                ingredientTestMain],
        }, {
            type: types.CHANG_PLACE,
            dragIndex: 0,
            hoverIndex: 1
        })).toEqual({
            ...initialState,
            dataCurrentBurger: [ingredientTestMain,
                ingredientTestSauce
            ],
        })
    });

    it('should handle INFORM_ADD_FILLING', () => {
        expect(constructorReducer(initialState, {
            type: types.INFORM_ADD_FILLING
        })).toEqual({
            ...initialState,
            messageAddFilling: 'Добавьте булочку и начинку в бургер'
        })
    });
});