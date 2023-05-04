import { TCardIngredient } from "../../services/types"

export type TIngredientsState = {
    dataIngredients: [] | TCardIngredient[],
    getIngredientsFailed: null | string | undefined,
    getIngredientsRequest: boolean,
    currentIngredient: null | TCardIngredient | undefined,
  }