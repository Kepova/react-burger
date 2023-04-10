import { Location } from 'history';
import { ChangeEvent, FormEvent } from 'react';

export type LocationState = {
  background?: Location
}

export type TCard = {
  _id: string,
  name: string,
  type: 'bun' | 'sauce' | 'main',
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
}

export type TCardIngredient = TCard & {
  isInOrder: number
}

export type TCardConstructor = TCard & {
  idConstructor: string
}

export type TIndex = {
  index: number
}

export type TCardConstructorProps = {
  card: TCardConstructor,
  index: TIndex
}

export type TGroupIngredients = {
  name: string;
  title: string;
  dataCards: TCardIngredient[]
}

export type TFormAuth = {
  title: string;
  nameButton: string;
  children: React.ReactNode;
  onSubmit: () => void
}

export type THandlerSubmit = (e: FormEvent) => void

export type TOnChange = (e: ChangeEvent<HTMLInputElement>) => void

export type TModal = {
  title?: string;
  children: React.ReactNode;
}

export type TModalError = {
  openError: string | null;
}

export type TModalOverlay = {
  handleClickClose: () => void;
}

export type TProtectedRoute = {
  element: React.ReactElement;
}
