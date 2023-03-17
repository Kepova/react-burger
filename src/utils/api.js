const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Возникла ошибка: ${res.status}`)
    }
};
//получить все ингредиенты
export const getBurgerIngridients = () => {
    return fetch(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkResponse)
};
//оформить заказ
export const createOrder = (ingredients, token) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        body:
            JSON.stringify({ "ingredients": ingredients })
    })
        .then(checkResponse)
};