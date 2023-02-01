export const BASE_URL = 'https://norma.nomoreparties.space/api/ingredients';

const CheckResponse = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
}

export const getBurgerIngridients = () => {
    return fetch(`${BASE_URL}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(CheckResponse)
}