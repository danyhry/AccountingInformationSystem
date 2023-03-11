import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {map, Observable, tap, throwError} from 'rxjs';
import {User} from "../models/user";
import {AuthResponse} from "../models/auth/auth";
import {LoginRequest} from "../models/auth/login";
import {catchError} from "rxjs/operators";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path?: '';

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router
  ) {
  }

  register(data: any): Observable<User> {
    return this.http.post<User>('auth/register', data);
  }

  login(data: LoginRequest, remember: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('auth/login', data)
      .pipe(
        tap(authResponse => this.setTokens(authResponse, remember)),
        map((authResponse: AuthResponse) => {
          this.userService.updateUser(authResponse.user);
          console.log(authResponse);

          localStorage.setItem('access_token', authResponse.token);

          return authResponse;
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.status === 401 ? 'Неправильна пошта або пароль' : 'Виникла помилка під час логіну';
          return throwError(errorMessage);
        })
      );
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.userService.clearUser();
    this.router.navigateByUrl('/login');
    return this.http.post<any>('auth/logout', null);
  }

  setTokens(authResponse: AuthResponse, remember: boolean): void {
    if (remember) {
      localStorage.setItem('access_token', authResponse.token);
      localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
      sessionStorage.setItem('access_token', authResponse.token);
      sessionStorage.setItem('currentUser', JSON.stringify(authResponse.user));
    } else {
      localStorage.setItem('access_token', authResponse.token);
      localStorage.setItem('currentUser', JSON.stringify(authResponse.user));
    }
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token') || Boolean(sessionStorage.getItem('access_token')));
  }

  getToken(): string | null {
    return localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  }

}
