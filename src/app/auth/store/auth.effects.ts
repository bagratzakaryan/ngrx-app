import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../user.model';
import {
  authenticateFail,
  authenticateSuccess,
  autoLogin,
  loginStart,
  logout,
  signupStart,
} from './auth.actions';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  kind?: string;
  idToken: string;
  email: string;
  refreshToken?: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const runAuthentication = (resData) => {
  const expirationDate = new Date(
    new Date().getTime() + Number(resData.expiresIn) * 1000
  );
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));

  return authenticateSuccess({
    payload: {
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate,
      redirect: true,
    },
  });
};

const runError = (errorRes) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(authenticateFail({ payload: errorMessage }));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(authenticateFail({ payload: errorMessage }));
};

@Injectable()
export class AuthEffects {
  authSignupStart = createEffect(() =>
    this.actions$.pipe(
      ofType(signupStart),
      switchMap((signupAction) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
              environment.firebaseAPIKey,
            {
              email: signupAction.payload.email,
              password: signupAction.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(Number(resData.expiresIn));
            }),
            map((resData) => runAuthentication(resData)),
            catchError((errorRes) => runError(errorRes))
          );
      })
    )
  );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap((authData) => {
        return (
          of({
            email: 'bagratzakaryan@yahoo.com',
            localId: '4',
            idToken: 'uyfuy68668fvhuvj',
            expiresIn: '2116',
          })
            // this.http
            //   .post<AuthResponseData>(
            //     'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            //       environment.firebaseAPIKey,
            //     {
            //       email: authData.payload.email,
            //       password: authData.payload.password,
            //       returnSecureToken: true,
            //     }
            //   )
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(
                  Number(resData.expiresIn) * 1000
                );
              }),
              map((resData) => runAuthentication(resData)),
              catchError((errorRes) => runError(errorRes))
            )
        );
      })
    )
  );

  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authenticateSuccess),
        tap((authAction) => {
          if (authAction.payload.redirect) {
            this.router.navigate(['./recipes']);
          }
        })
      ),
    { dispatch: false }
  );

  authAutoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(autoLogin),
      map(() => {
        const userData: {
          email: string;
          id: string;
          _token: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          return { type: 'DUMMY' };
        }

        const loadedUser = new User(
          userData.email,
          userData.id,
          userData._token,
          new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
          const expirationDuration =
            new Date(userData._tokenExpirationDate).getTime() -
            new Date().getTime();
          this.authService.setLogoutTimer(expirationDuration);

          return authenticateSuccess({
            payload: {
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate),
              redirect: false,
            },
          });
        }

        return { type: 'DUMMY' };
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['./auth']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private actions$: Actions
  ) {}
}
