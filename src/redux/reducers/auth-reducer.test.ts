import { initialState, authReducer } from './auth-reducer';
import * as types from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state auth reducer', () => {
        expect(authReducer(undefined, {} as any)).toEqual(initialState)
    });

    it('should handle CREATE_USER', () => {
        expect(authReducer(initialState, { type: types.CREATE_USER })).toEqual({
            ...initialState,
            createUserRequest: true,
            createUserFailed: null
        })
    });

    it('should handle CREATE_USER_SUCCESS', () => {
        expect(authReducer({
            ...initialState,
            createUserRequest: true,
            createUserFailed: null
        }, {
            type: types.CREATE_USER_SUCCESS
        })).toEqual({
            ...initialState,
            createUserFailed: null,
            createUserRequest: false
        })
    });
    it('should handle CREATE_USER_FAILED', () => {
        expect(authReducer(initialState, {
            type: types.CREATE_USER_FAILED,
            err: 'error'
        })).toEqual({
            ...initialState,
            createUserFailed: 'error',
            createUserRequest: false
        })
    });

    it('should handle AUTH_USER', () => {
        expect(authReducer(initialState, { type: types.AUTH_USER })).toEqual({
            ...initialState,
            loginUserRequest: true,
            loginUserFailed: null
        })
    });

    it('should handle AUTH_USER_SUCCESS', () => {
        expect(authReducer({
            ...initialState,
            loginUserRequest: true,
            loginUserFailed: null
        }, {
            type: types.AUTH_USER_SUCCESS
        })).toEqual({
            ...initialState,
            loginUserFailed: null,
            loginUserRequest: false
        })
    });


    it('should handle AUTH_USER_FAILED', () => {
        expect(authReducer({
            ...initialState,
            loginUserRequest: true,
        }, {
            type: types.AUTH_USER_FAILED,
            err: 'error'
        })).toEqual({
            ...initialState,
            loginUserFailed: 'error',
            loginUserRequest: false
        })
    });


    it('should handle FORGOT_PASSWORD', () => {
        expect(authReducer(initialState,
            { type: types.FORGOT_PASSWORD }))
            .toEqual({
                ...initialState,
                forgotPasswordRequest: true,
                forgotPasswordFailed: null,
                isUpdatePassword: null
            })
    });

    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(authReducer(initialState,
            { type: types.FORGOT_PASSWORD_SUCCESS }))
            .toEqual({
                ...initialState,
                forgotPasswordRequest: false,
                isUpdatePassword: true
            })
    });


    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(authReducer(initialState,
            {
                type: types.FORGOT_PASSWORD_FAILED,
                err: 'error'
            })).toEqual({
                ...initialState,
                forgotPasswordFailed: 'error',
                forgotPasswordRequest: false
            })
    });

    it('should handle UPDATE_PASSWORD', () => {
        expect(authReducer(initialState,
            { type: types.UPDATE_PASSWORD }))
            .toEqual({
                ...initialState,
                updatePasswordRequest: true,
                updatePasswordFailed: null,
                isUpdatePassword: null
            })
    });

    it('should handle UPDATE_PASSWORD_SUCCESS', () => {
        expect(authReducer(initialState,
            { type: types.UPDATE_PASSWORD_SUCCESS }))
            .toEqual({
                ...initialState,
                updatePasswordRequest: false
            })
    });

    it('should handle UPDATE_PASSWORD_FAILED', () => {
        expect(authReducer(initialState,
            {
                type: types.UPDATE_PASSWORD_FAILED,
                err: 'error'
            }))
            .toEqual({
                ...initialState,
                updatePasswordFailed: 'error',
                updatePasswordRequest: false,
                isUpdatePassword: true
            })
    });

    it('should handle LOGIN_OUT', () => {
        expect(authReducer(initialState,
            { type: types.LOGIN_OUT }))
            .toEqual({
                ...initialState,
                loginOutRequest: true,
                loginOutFailed: null
            })
    });

    it('should handle LOGIN_SUCCESS', () => {
        expect(authReducer(initialState,
            { type: types.LOGIN_OUT_SUCCESS }))
            .toEqual({
                ...initialState,
                dataUser: null,
                loginOutRequest: false,
                getUserSuccess: null
            })
    });

    it('should handle LOGIN_FAILED', () => {
        expect(authReducer(initialState,
            {
                type: types.LOGIN_OUT_FAILED,
                err: 'error'
            }))
            .toEqual({
                ...initialState,
                refreshTokenFailed: 'error',
                refreshTokenRequest: false
            })
    });

    it('should handle REFRESH_TOKEN', () => {
        expect(authReducer(initialState,
            { type: types.REFRESH_TOKEN }))
            .toEqual({
                ...initialState,
                refreshTokenRequest: true,
                refreshTokenFailed: null
            })
    });

    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        expect(authReducer(initialState,
            { type: types.REFRESH_TOKEN_SUCCESS }))
            .toEqual({
                ...initialState,
                refreshTokenRequest: false
            })
    });

    it('should handle REFRESH_TOKEN_FAILED', () => {
        expect(authReducer(initialState,
            {
                type: types.REFRESH_TOKEN_FAILED,
                err: 'error'
            }))
            .toEqual({
                ...initialState,
                refreshTokenFailed: 'error',
                refreshTokenRequest: false
            })
    });

    it('should handle GET_USER', () => {
        expect(authReducer(initialState,
            { type: types.GET_USER }))
            .toEqual({
                ...initialState,
                getUserRequest: true,
                getUserFailed: null,
                getUserSuccess: false
            })
    });

    it('should handle GET_USER_SUCCESS', () => {
        const dataUserTest = {
            email: 'email',
            name: 'name'
        }
        expect(authReducer(initialState,
            {
                type: types.GET_USER_SUCCESS,
                dataUser: dataUserTest
            }))
            .toEqual({
                ...initialState,
                dataUser: dataUserTest,
                getUserRequest: false,
                getUserSuccess: true
            })
    });

    it('should handle GET_USER_FAILED', () => {
        expect(authReducer(initialState,
            {
                type: types.GET_USER_FAILED,
                err: 'error'
            }))
            .toEqual({
                ...initialState,
                getUserFailed: 'error',
                getUserRequest: false,
                getUserSuccess: false
            })
    });

    it('should handle UPDATE_USER', () => {
        expect(authReducer(initialState,
            { type: types.UPDATE_USER }))
            .toEqual({
                ...initialState,
                updateUserRequest: true,
                updateUserFailed: null
            })
    });

    it('should handle UPDATE_USER_SUCCESS', () => {
        const dataUpdateUserTest = {
            email: 'email',
            name: 'name',
            password: 'password'
        }
        expect(authReducer(initialState,
            {
                type: types.UPDATE_USER_SUCCESS,
                dataUser: dataUpdateUserTest
            }))
            .toEqual({
                ...initialState,
                dataUser: dataUpdateUserTest,
                updateUserRequest: false
            })
    });

    it('should handle UPDATE_USER_FAILED', () => {
        expect(authReducer(initialState,
            {
                type: types.UPDATE_USER_FAILED,
                err: 'error'
            }))
            .toEqual({
                ...initialState,
                updateUserFailed: 'error',
                updateUserRequest: false
            })
    });

});