import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from "../../environments/environment";
import {AuthService} from "../services/auth.service";
import {NotificationService} from "../services/notification.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private notificationService: NotificationService
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
            // if (err.status === 401 || err.status === 403) {
            //   console.log("tokes is expired");
            //   localStorage.clear();
            //   sessionStorage.clear();
            // }
            if (err.status === 500 && err.error.message.startsWith('JWT expired')) {
              this.notificationService.showErrorMessage("JWT token has expired");
              this.authService.logout();
              console.log("logout");
            }
            return throwError(err);
          }
        )
      );
  }
}
