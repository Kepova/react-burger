import { Location } from 'history';
import { ChangeEvent, FormEvent } from 'react';

export type LocationState = {
  background?: Location,
  from?: string
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

export type TCardConstructor = TCardIngredient & {
  idConstructor: string
}

export type TCardConstructorProps = {
  card: TCardConstructor,
  index: number
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
  openError: string | null | undefined;
}

export type TModalOverlay = {
  handleClickClose: () => void;
}

export type TProtectedRoute = {
  element: React.ReactElement;
}

export type TDataOrder = {
  success: boolean;
  name: string;
  order: {
    createdAt: string;
    ingredients: TCardIngredient[];
    name: string;
    number: number;
    owner: {
      createdAt: string;
      email: string;
      name: string;
      updatedAt: string;
    }
    price: number;
    status: string;
    _id: string;
    updatedAt: string;
  }
}
