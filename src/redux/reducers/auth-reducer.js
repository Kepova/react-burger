import {
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED,
    AUTH_USER,
    AUTH_USER_SUCCESS,
    AUTH_USER_FAILED,
    FORGOT_PASSWORD,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    UPDATE_PASSWORD,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAILED,
    LOGIN_OUT,
    LOGIN_OUT_SUCCESS,
    LOGIN_OUT_FAILED,
    REFRECH_TOKEN,
    REFRECH_TOKEN_SUCCESS,
    REFRECH_TOKEN_FAILED,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from '../actions/actionTypes';

const initialState = {
    dataUser: {},
    accessToken: null,
    createUserRequest: false,
    createUserFailed: null,
    loginUserFailed: null,
    loginUserRequest: false,
    forgotPasswordFailed: null,
    forgotPasswordRequest: false,
    isUpdatePassword: null,
    updatePasswordFailed: null,
    updatePasswordRequest: false,
    loginOutFailed: null,
    loginOutRequest: false,
    getUserFailed: null,
    getUserRequest: null,
    getUserSucces: null,
    isAuthChecked: true,
    updateUserFailed: null,
    updateUserRequest: false,
    refrechTokenFailed: null,
    refrechTokenRequest: false
};

export function authReducer(state = initialState, action) {
    switch (action.type) {
        //регистрация пользователя
        case CREATE_USER: {
            return {
                ...state,
                createUserRequest: true,
                createUserFailed: null
            };
        }
        case CREATE_USER_SUCCESS: {
            return {
                ...state,
                accessToken: action.accessToken,
                createUserRequest: false
            };
        }
        case CREATE_USER_FAILED: {
            return {
                ...state,
                createUserFailed: action.err,
                createUserRequest: false
            };
        }
        //авторизация пользователя
        case AUTH_USER: {
            return {
                ...state,
                loginUserRequest: true,
                loginUserFailed: null
            };
        }
        case AUTH_USER_SUCCESS: {
            return {
                ...state,
                accessToken: action.accessToken,
                loginUserRequest: false
            };
        }
        case AUTH_USER_FAILED: {
            return {
                ...state,
                loginUserFailed: action.err,
                loginUserRequest: false
            };
        }
        //запрос на восстановление пароля
        case FORGOT_PASSWORD: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordFailed: null,
                isUpdatePassword: null
            };
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordRequest: false,
                isUpdatePassword: true
            };
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordFailed: action.err,
                forgotPasswordRequest: false
            };
        }
        //восстановление пароля
        case UPDATE_PASSWORD: {
            return {
                ...state,
                updatePasswordRequest: true,
                updatePasswordFailed: null,
                isUpdatePassword: null
            };
        }
        case UPDATE_PASSWORD_SUCCESS: {
            return {
                ...state,
                updatePasswordRequest: false
            };
        }
        case UPDATE_PASSWORD_FAILED: {
            return {
                ...state,
                updatePasswordFailed: action.err,
                updatePasswordRequest: false,
                isUpdatePassword: true
            };
        }
        //выход из профиля
        case LOGIN_OUT: {
            return {
                ...state,
                loginOutRequest: true,
                loginOutFailed: null
            };
        }
        case LOGIN_OUT_SUCCESS: {
            return {
                ...state,
                dataUser: {},
                accessToken: null,
                loginOutRequest: false,
                getUserSucces: null
            };
        }
        case LOGIN_OUT_FAILED: {
            return {
                ...state,
                refrechTokenFailed: action.err,
                refrechTokenRequest: false
            };
        }
        //обновление токена
        case REFRECH_TOKEN: {
            return {
                ...state,
                refrechTokenRequest: true,
                refrechTokenFailed: null
            };
        }
        case REFRECH_TOKEN_SUCCESS: {
            return {
                ...state,
                accessToken: action.accessToken,
                refrechTokenRequest: false
            };
        }
        case REFRECH_TOKEN_FAILED: {
            return {
                ...state,
                refrechTokenFailed: action.err,
                refrechTokenRequest: false
            };
        }
        //получение данных пользователя
        case GET_USER: {
            return {
                ...state,
                getUserRequest: true,
                getUserFailed: null,
                getUserSucces: false
            };
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                dataUser: action.dataUser,
                getUserRequest: false,
                getUserSucces: true
            };
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserFailed: action.err,
                getUserRequest: false,
                getUserSucces: false
            };
        }
        //изменение данных пользователя
        case UPDATE_USER: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserFailed: null
            };
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                dataUser: action.dataUser,
                updateUserRequest: false
            };
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserFailed: action.err,
                updateUserRequest: false
            };
        }
        default: {
            return state
        }
    }
};