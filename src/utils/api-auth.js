export const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Возникла ошибка: ${res.status}`)
    }
};
//зарегистрировать пользователя
export const createUser = ({ email, password, name }) => {
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
export const loginUser = ({ email, password }) => {
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
export const recoverPassword = (email) => {
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
export const resetPassword = (password, token) => {
    return fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({
                "password": password,
                "token": token
            })
    })
        .then(checkResponse)
};
//выход из профиля
export const loginOut = (token) => {
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
export const refrechToken = (token) => {
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
export const getUser = (token) => {
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
export const updateUser = (dataUser, token) => {
    return fetch(`${BASE_URL}/auth/user`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        body:
            JSON.stringify(dataUser)
    })
        .then(checkResponse)
};
