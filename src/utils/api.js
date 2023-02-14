export const BASE_URL = 'https://norma.nomoreparties.space/api';

const CheckResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`ошибка: ${res.status}`)
    }
};

export const getBurgerIngridients = () => {
    return fetch(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(CheckResponse)
};

export const createOrder = (ingredients) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:
            JSON.stringify({ "ingredients": ingredients })
    })
        .then(CheckResponse)
};