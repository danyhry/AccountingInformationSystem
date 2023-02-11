import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {AuthService} from "../services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      url: environment.API_URL + req.url,
      setHeaders: this.authService.isAuthenticated() ? {
        Authorization: `${this.authService.getToken()}`
      } : {}
    });
    return next.handle(req)
      .pipe(
        catchError(err => {
            if (err.status === 401 || err.status === 403) {
              // localStorage.clear();
              // sessionStorage.clear();
            }
            return throwError(err);
          }
        )
      );
  }
}
