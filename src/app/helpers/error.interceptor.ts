import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

import { Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private refreshToken;

  constructor(
    private tokenService: StorageService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.refreshToken = this.tokenService.getRefreshToken();
    console.log('error interceptor called');
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('error caught', error);

        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }

        if (
          error instanceof HttpErrorResponse &&
          req.url.includes('GetNewToken') &&
          error.status === 400
        ) {
          this.authService.redirectUrl = this.router.routerState.snapshot.url;
          this.tokenService.clean();
          this.router.navigate(['login']);
        }

        if (error instanceof HttpErrorResponse) {
          console.log('error message', error.message);

          if (error.status === 403) {
            this.alertService.addError('An error occurred', 'Not authorized');
          }

          if (error.status === 404) {
            this.alertService.addError('An error occurred', 'Not found');
          }

          this.alertService.addError('An error occurred', error.error?.message);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (this.refreshToken != null) {
      return this.authService.getNewToken(this.refreshToken).pipe(
        switchMap((data: any) => {
          console.log('data from switchMap', data);
          return next.handle(request);
        })
      );
    }

    this.router.navigate(['login']);
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
