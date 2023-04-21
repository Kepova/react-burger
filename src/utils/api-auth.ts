import { TCreateUser, TLoginUser, TResetPassword, TUpdateUser } from "../services/api-types";

export const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res);
    }
};
//зарегистрировать пользователя
export const createUser = ({ email, password, name }: TCreateUser) => {
    return fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                email,
                password,
                name
            })
    })
        .then(checkResponse)
};
//авторизация
export const loginUser = ({ email, password }: TLoginUser) => {
    return fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                email,
                password
            })
    })
        .then(checkResponse)
};
//забыли пароль
export const recoverPassword = (email: string) => {
    return fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({ "email": email })
    })
        .then(checkResponse)
};
//восстановить пароль
export const resetPassword = ({ password, token }: TResetPassword) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                password,
                token
            })
    })
        .then(checkResponse)
};
//выход из профиля
export const loginOut = (token: string) => {
    return fetch(`${BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                'token': token
            })
    })
        .then(checkResponse)
};
//обновление токена
export const refreshToken = (token: string | null) => {
    return fetch(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body:
            JSON.stringify({
                'token': token
            })
    })
        .then(checkResponse)
};
//получить данные пользователя
export const getUser = (token: string) => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        }
    })
        .then(checkResponse)
};
//изменить данные пользователя 
export const updateUser = ({ newDataUser, token }: TUpdateUser) => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        body:
            JSON.stringify(newDataUser)
    })
        .then(checkResponse)
};
