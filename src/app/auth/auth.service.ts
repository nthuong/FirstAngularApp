import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}
@Injectable({ providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    constructor( private http: HttpClient,
        private router: Router) {}
    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhBQeAD29Myeu1fQgCJgP_f66dnDXgTqc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
        .pipe(catchError(errorRes => this.handleError(errorRes)),
            tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }
    signIn(email: string, password: string) {
        return this.http.post<AuthResponseData>
            ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhBQeAD29Myeu1fQgCJgP_f66dnDXgTqc',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => this.handleError(errorRes)),
            tap(resData => this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn))
        );
    }
    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    }
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred.';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exist already.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(errorMessage);
    }
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const tokenExpirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, tokenExpirationDate);
        this.user.next(user);
    }
}
