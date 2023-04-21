export type TOrderState = {
    orders: null | TOrder[];
    currentOrder: null | TOrder;
    getOrderFailed: boolean | string | undefined,
    getOrderRequest: boolean
}

export type TOrder = {
    ingredients: string[];
    name: string;
    _id: string;
    status: string,
    number: number,
    createdAt: string,
    updatedAt: string
}