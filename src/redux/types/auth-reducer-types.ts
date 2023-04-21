import { TDataUser } from "../../services/api-types";

export type TAuthState = {
  dataUser: null | TDataUser,
  createUserRequest: boolean,
  createUserFailed: null | string | undefined,
  loginUserFailed: null | string | undefined,
  loginUserRequest: boolean,
  forgotPasswordFailed: null | string | undefined,
  forgotPasswordRequest: boolean,
  isUpdatePassword: null | boolean,
  updatePasswordFailed: null | string | undefined,
  updatePasswordRequest: boolean,
  loginOutFailed: null | string | undefined,
  loginOutRequest: boolean,
  getUserFailed: null | string | undefined,
  getUserRequest: null | boolean,
  getUserSuccess: null | boolean,
  isAuthChecked: boolean,
  updateUserFailed: null | string | undefined,
  updateUserRequest: boolean,
  refreshTokenFailed: null | string | undefined,
  refreshTokenRequest: boolean
}