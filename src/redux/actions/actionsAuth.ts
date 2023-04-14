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
    REFRESH_TOKEN,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED
} from './actionTypes';
import {
    createUser,
    loginUser,
    recoverPassword,
    resetPassword,
    loginOut,
    refreshToken,
    getUser,
    updateUser
} from '../../utils/api-auth';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookies-auth';
import { AppDispatch, AppThunk } from '../types/index';

//регистрация пользователя
export const createNewUser: AppThunk = ({ userName, userEmail, userPassword }) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: CREATE_USER
        })
        createUser({
            'name': userName,
            'email': userEmail,
            'password': userPassword
        })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: CREATE_USER_SUCCESS,
                        accessToken: res.accessToken.split('Bearer ')[1]
                    })
                    setCookie('token', res.refreshToken, { maxAge: '86400', path: '/' });
                } else {
                    dispatch({
                        type: CREATE_USER_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: CREATE_USER_FAILED,
                    err: `Возникла ошибка: ${err.status}`
                })
            })
    }
};

//авторизация пользователя
export const authUser: AppThunk = ({ userEmail, userPassword }) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: AUTH_USER
        })
        loginUser({
            'email': userEmail,
            'password': userPassword
        })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: AUTH_USER_SUCCESS,
                        accessToken: res.accessToken.split('Bearer ')[1]
                    })
                    setCookie('token', res.refreshToken, { maxAge: '86400', path: '/' });
                } else {
                    dispatch({
                        type: AUTH_USER_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: AUTH_USER_FAILED,
                    err: `Возникла ошибка: ${err.status}`
                })
            })
    }
};

//восстановить пароль
export const forgotPassword: AppThunk = (email) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: FORGOT_PASSWORD
        })
        recoverPassword(email)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS
                    })
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: FORGOT_PASSWORD_FAILED,
                    err: `Возникла ошибка: ${err.status}`
                })
            })
    }
};

//сбросить пароль
export const updatePassword: AppThunk = ({ password, token }, props) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_PASSWORD
        })
        resetPassword({ password, token })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_PASSWORD_SUCCESS
                    })
                    props.onSuccess();
                } else {
                    dispatch({
                        type: UPDATE_PASSWORD_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: UPDATE_PASSWORD_FAILED,
                    err: `Возникла ошибка: ${err.status}`
                })
            })
    }
};

//выход из профиля
export const loggingOutUser: AppThunk = (token, props) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGIN_OUT
        })
        loginOut(token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: LOGIN_OUT_SUCCESS
                    })
                    deleteCookie('token');
                    props.onSuccess();
                } else {
                    dispatch({
                        type: LOGIN_OUT_FAILED
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_OUT_FAILED,
                    err: `Возникла ошибка: ${err.status}`
                })
            })
    }
};

//обновление токена
export const refreshTokenUser: AppThunk = (props) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REFRESH_TOKEN
        })
        const token = getCookie('token');
        refreshToken(token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: REFRESH_TOKEN_SUCCESS,
                        accessToken: res.accessToken.split('Bearer ')[1]
                    })
                    setCookie('token', res.refreshToken, { maxAge: '86400', path: '/' });
                    if (props?.reRequest) {
                        if (props?.reRequest.data) {
                            dispatch(props.data, props.reRequest(res.accessToken.split('Bearer ')[1]));
                        }
                        dispatch(props.reRequest(res.accessToken.split('Bearer ')[1]));
                    }
                } else {
                    dispatch({
                        type: REFRESH_TOKEN_FAILED
                    })
                }
            })
            .catch(error => {
                error.json().then((err: any) => {
                    if (err.message === 'Token is invalid') {
                        dispatch(loggingOutUser(token));
                    }
                    dispatch({
                        type: REFRESH_TOKEN_FAILED,
                        err: `Возникла ошибка: ${err.status}`
                    })
                })
                    .catch((err: any) => {
                        dispatch({
                            type: REFRESH_TOKEN_FAILED,
                            err: `Возникла ошибка: ${err.status}`
                        })
                    })
            })
    }
};

//получить данные пользователя
export const getDataUser: AppThunk = (token) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_USER
        })
        getUser(token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        dataUser: res.user
                    })
                } else {
                    dispatch({
                        type: GET_USER_FAILED
                    })
                }
            })
            .catch(res => {
                res.json().then((err: any) => {
                    if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
                        dispatch(refreshTokenUser({ reRequest: getDataUser }));
                    }
                    dispatch({
                        type: GET_USER_FAILED,
                        err: `Возникла ошибка: ${err.status}`
                    })
                })
                    .catch((err: any) => {
                        dispatch({
                            type: GET_USER_FAILED,
                            err: `Возникла ошибка: ${err.status}`
                        })
                    })
            })
    }
};

//изменить данные пользователя
export const updateDataUser: AppThunk = ({ newDataUser, token }) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: UPDATE_USER
        })
        updateUser({ newDataUser, token })
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        dataUser: res.user
                    })
                } else {
                    dispatch({
                        type: UPDATE_USER_FAILED
                    })
                }
            })
            .catch(res => {
                res.json().then((err: any) => {
                    if (err.message === 'jwt expired' || err.message === 'jwt malformed') {
                        dispatch(refreshTokenUser({ reRequest: updateDataUser, data: newDataUser }));
                    } else {
                        dispatch({
                            type: UPDATE_USER_FAILED,
                            err: `Возникла ошибка: ${err.status}`
                        })
                    }
                })
            })
            .catch(err => {
                dispatch({
                    type: UPDATE_USER_FAILED,
                    err: `Возникла ошибка: ${err.status}`
                })
            })
    }
};