import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {User} from "../models/user";
import {AuthResponse} from "../models/auth/auth";
import {LoginRequest} from "../models/auth/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path?: '';

  public isAuth!: boolean;

  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<User> {
    return this.http.post<User>('auth/register', data);
  }

  login(data: LoginRequest, remember: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('auth/login', data)
      .pipe(tap(authResponse => {
          this.setTokens(authResponse, remember);
        })
      );
  }

  logout() {
    return this.http.post<any>('auth/logout', null);
  }

  setTokens(authResponse: AuthResponse, remember: boolean): void {
    remember ? localStorage.setItem('access_token', authResponse.token)
      : sessionStorage.setItem('access_token', authResponse.token);
  }

  isAuthenticated(): boolean {
    this.isAuth = Boolean(localStorage.getItem('access_token') || Boolean(sessionStorage.getItem('access_token')));
    return this.isAuth;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  }
}
