import { TDataUser } from '../../services/api-types';
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
} from '../actions/actionTypes';

export type TActionsAuth = TCreateNewUser |
    TCreateNewUserSuccess |
    TCreateNewUserFailed |
    TAuthUser |
    TAuthUserSuccess |
    TAuthUserFailed |
    TForgotPassword |
    TForgotPasswordSuccess |
    TForgotPasswordFailed |
    TUpdatePassword |
    TUpdatePasswordSuccess |
    TUpdatePasswordFailed |
    TLoggingOutUser |
    TLoggingOutUserSuccess |
    TLoggingOutUserFailed |
    TRefreshTokenUser |
    TRefreshTokenUserSuccess |
    TRefreshTokenUserFailed |
    TGetDataUser |
    TGetDataUserSuccess |
    TGetDataUserFailed |
    TUpdateDataUser |
    TUpdateDataUserSuccess |
    TUpdateDataUserFailed;

export type TCreateNewUser = {
    readonly type: typeof CREATE_USER
};

export type TCreateNewUserSuccess = {
    readonly type: typeof CREATE_USER_SUCCESS,
};

export type TCreateNewUserFailed = {
    readonly type: typeof CREATE_USER_FAILED,
    err?: string
};

export type TAuthUser = {
    readonly type: typeof AUTH_USER
};

export type TAuthUserSuccess = {
    readonly type: typeof AUTH_USER_SUCCESS,
};

export type TAuthUserFailed = {
    readonly type: typeof AUTH_USER_FAILED,
    err?: string
};

export type TForgotPassword = {
    readonly type: typeof FORGOT_PASSWORD
};

export type TForgotPasswordSuccess = {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
};

export type TForgotPasswordFailed = {
    readonly type: typeof FORGOT_PASSWORD_FAILED,
    err?: string
};

export type TUpdatePassword = {
    readonly type: typeof UPDATE_PASSWORD
};

export type TUpdatePasswordSuccess = {
    readonly type: typeof UPDATE_PASSWORD_SUCCESS
};

export type TUpdatePasswordFailed = {
    readonly type: typeof UPDATE_PASSWORD_FAILED,
    err?: string
};

export type TLoggingOutUser = {
    readonly type: typeof LOGIN_OUT
};

export type TLoggingOutUserSuccess = {
    readonly type: typeof LOGIN_OUT_SUCCESS
};

export type TLoggingOutUserFailed = {
    readonly type: typeof LOGIN_OUT_FAILED,
    err?: string
};

export type TRefreshTokenUser = {
    readonly type: typeof REFRESH_TOKEN
};

export type TRefreshTokenUserSuccess = {
    readonly type: typeof REFRESH_TOKEN_SUCCESS,
};

export type TRefreshTokenUserFailed = {
    readonly type: typeof REFRESH_TOKEN_FAILED,
    err?: string
};

export type TGetDataUser = {
    readonly type: typeof GET_USER
};

export type TGetDataUserSuccess = {
    readonly type: typeof GET_USER_SUCCESS,
    dataUser: TDataUser
};

export type TGetDataUserFailed = {
    readonly type: typeof GET_USER_FAILED,
    err?: string
};

export type TUpdateDataUser = {
    readonly type: typeof UPDATE_USER
};

export type TUpdateDataUserSuccess = {
    readonly type: typeof UPDATE_USER_SUCCESS,
    dataUser: TDataUser
};

export type TUpdateDataUserFailed = {
    readonly type: typeof UPDATE_USER_FAILED,
    err?: string
};