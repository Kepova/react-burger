import { TCardIngredient } from "../services/types";

export const selectionIngredientsById = (dataIngredients: TCardIngredient[], dataId: string[]) => {
    return dataId.reduce((accumulator: TCardIngredient[], currentId: string): TCardIngredient[] => {
        const item = dataIngredients.find(el => el._id === currentId)
        if (item) {
            accumulator.push(item)
        }
        return accumulator;
    }, [])
};

export const selectionIngredientsByCount = (dataIngredients: TCardIngredient[], dataId: string[]) => {
    const data = selectionIngredientsById(dataIngredients, dataId);
    return data.reduce((acc: TCardIngredient[], el: TCardIngredient): TCardIngredient[] => {
        const item = acc.findIndex(elem => elem._id === el._id)
        if (item !== -1) {
            acc[item] = { ...acc[item], isInOrder: acc[item].isInOrder + 1 };
            return acc;
        }
        acc.push({ ...el, isInOrder: 1 });
        return acc;
    }, [])
};