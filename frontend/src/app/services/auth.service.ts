import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription, tap} from 'rxjs';
import {User} from "../models/user";
import {AuthResponse} from "../models/auth/auth";
import {LoginRequest} from "../models/auth/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path?: '';

  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<User> {
    return this.http.post<User>('auth/register', data);
  }

  login(data: LoginRequest, remember: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('auth/login', data).pipe(
      tap(authResponse => this.setTokens(authResponse, remember))
    );
  }

  logout() {
    console.log("auth.service logout");
    return this.http.post<any>('auth/logout', null);
  }

  setTokens(authResponse: AuthResponse, remember: boolean): void {
    console.log("remember?" + remember);
    if (remember) {
      console.log("localStorage was set")
      localStorage.setItem('access_token', authResponse.jwt)
    } else {
      console.log("sessionStorage was set")
      sessionStorage.setItem('access_token', authResponse.jwt);
    }
  }

  isAuthenticated(): boolean {
    console.log("isAuthenticated");
    return Boolean(localStorage.getItem('access_token') || Boolean(sessionStorage.getItem('access_token')));
  }

  getToken(): string | null {
    console.log('get token');
    return localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  }

}
