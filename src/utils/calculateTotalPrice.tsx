import { TCardConstructor, TCardIngredient } from "../services/types";

const calculateTotalPrice = (data: any) => {
    const sum = data.reduce((accumulator: number, currentObj: TCardConstructor | TCardIngredient) => {
        return accumulator + currentObj.price
    }, 0);

    return sum
}

export default calculateTotalPrice;