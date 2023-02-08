import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject, Subscription, tap} from 'rxjs';
import {User} from "../models/user";
import {AuthResponse} from "../models/auth/auth";
import {LoginRequest} from "../models/auth/login";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path?: '';

  private loggedIn: Subject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) {
  }

  register(data: any): Observable<User> {
    return this.http.post<User>('auth/register', data);
  }

  login(data: LoginRequest, remember: boolean): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('auth/login', data)
      .pipe(tap(authResponse => {
          this.setTokens(authResponse, remember);
          this.loggedIn.next(true);
        })
      );
  }

  logout() {
    return this.http.post<any>('auth/logout', null);
  }

  setTokens(authResponse: AuthResponse, remember: boolean): void {
    console.log("remember?" + remember);
    if (remember) {
      console.log("localStorage was set")
      localStorage.setItem('access_token', authResponse.token)
    } else {
      console.log("sessionStorage was set")
      sessionStorage.setItem('access_token', authResponse.token);
    }
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('access_token') || Boolean(sessionStorage.getItem('access_token')));
  }

  getToken(): string | null {
    return localStorage.getItem('access_token') ?? sessionStorage.getItem('access_token');
  }

}
