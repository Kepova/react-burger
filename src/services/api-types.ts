import { TCardConstructor } from "./types";

export type TCreateUser = {
    email: string;
    password: string;
    name: string;
}

export type TLoginUser = {
    email: string;
    password: string;
}

export type TResetPassword = {
    password: string;
    token: string;
}

export type TUpdateUser = {
    newDataUser: {
        email?: string;
        password?: string;
        name?: string;
    };
    token: string;
}

export type TCreateOrder = {
    ingredients: TCardConstructor[];
    token: string
}

export type TDataUser = {
    email: string;
    name: string;
  }