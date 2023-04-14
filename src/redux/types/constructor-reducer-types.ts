import { TCardConstructor, TDataOrder } from "../../services/types"

export type TConstructorState = {
  dataCurrentBurger: ReadonlyArray<TCardConstructor>,
  bunBurger: TCardConstructor | null,
  dataOrder: null | TDataOrder,
  totalPrice: number,
  getOrderFailed: null | string | undefined,
  getOrderRequest: boolean,
  openModalOrder: boolean,
  messageAddFilling: null | string
}