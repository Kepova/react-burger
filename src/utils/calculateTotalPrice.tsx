import { TCardConstructor, TCardIngredient } from "../services/types";

const calculateTotalPrice = (data: any) => {
    const sum = data.reduce((accumulator: number, currentObj: TCardConstructor | TCardIngredient) => {
        let priceIngredient: number = currentObj.price;
        if (currentObj.type === 'bun') { priceIngredient = (priceIngredient * 2) }
        return accumulator + priceIngredient
    }, 0);

    return sum
}

export default calculateTotalPrice;