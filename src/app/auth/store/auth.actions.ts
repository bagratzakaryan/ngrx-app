import { createAction, props } from '@ngrx/store';

export const signupStart = createAction(
  '[auth] signup start',
  props<{
    payload: {
      email: string;
      password: string;
    };
  }>()
);
export const loginStart = createAction(
  '[auth] login start',
  props<{
    payload: {
      email: string;
      password: string;
    };
  }>()
);
export const autoLogin = createAction('[auth] auto login');
export const authenticateSuccess = createAction(
  '[auth] authenticate success',
  props<{
    payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    };
  }>()
);
export const authenticateFail = createAction(
  '[auth] authenticate fail',
  props<{
    payload: string;
  }>()
);
export const logout = createAction('[auth] logout');
export const clearError = createAction('[auth] clear error');
