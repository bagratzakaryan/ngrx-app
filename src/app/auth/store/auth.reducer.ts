import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import {
  authenticateSuccess,
  authenticateFail,
  loginStart,
  logout,
  signupStart,
  clearError,
} from './auth.actions';
import { State } from './auth.state.interface';

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(authenticateSuccess, (state, action) => {
    const user = new User(
      action.payload.email,
      action.payload.token,
      action.payload.userId,
      action.payload.expirationDate
    );
    return { ...state, authError: null, loading: false, user };
  }),
  on(loginStart, signupStart, (state, action) => {
    return { ...state, authError: null, loading: true };
  }),
  on(authenticateFail, (state, action) => {
    return { ...state, authError: action.payload, loading: false, user: null };
  }),
  on(logout, (state) => {
    return { ...state, authError: null, user: null };
  }),
  on(clearError, (state) => {
    return { ...state, authError: null };
  })
);
