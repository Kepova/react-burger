import { TCreateOrder } from "../services/api-types";

export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(res);
    }
};
//получить все ингредиенты
export const getBurgerIngredients = () => {
    return fetch(`${BASE_URL}/ingredients`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkResponse)
};
//оформить заказ
export const createOrder = ({ ingredients, token }: TCreateOrder) => {
    return fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token
        },
        body:
            JSON.stringify({ ingredients })
    })
        .then(checkResponse)
};

//получить данные заказа по id
export const getOrder = (id: number) => {
    return fetch(`${BASE_URL}/orders/${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(checkResponse)
};