import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { SessionManagerService } from '../services/session/session-manager.service';
import { RefreshTokenService } from '../services/auth/refresh-token.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtRefreshInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private router: Router,
    private sessionServ: SessionManagerService,
    private refreshTokenSrv: RefreshTokenService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let failed = request.clone({ withCredentials: true });

    return next.handle(failed).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !failed.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(failed, next);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.sessionServ.isLoggedIn()) {
        return this.refreshTokenSrv.refreshUserToken().pipe(
          switchMap((e) => {
            this.isRefreshing = false;
            this.sessionServ.saveRefresh(e.refresh);
            this.sessionServ.saveAccessToken(e.token);
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.sessionServ.clean();
            this.router.navigate(['../authentification/login']);
            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtRefreshInterceptor,
    multi: true,
  },
];
