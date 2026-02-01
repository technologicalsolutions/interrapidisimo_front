import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, of } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import dayjs from 'dayjs';

//models
import { SessionService } from '../../auth/services/session.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private sessionService: SessionService,
        private message: NzMessageService,
    ) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.sessionService.currentUserValue;
        if (currentUser) {
            const dateToken = dayjs(currentUser.token?.expiracion).add(1, 'day');
            const date = dayjs();

            if (!dateToken.isBefore(date)) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.token?.token}`,
                    },
                });
            } else {
                this.sessionService.logout();
            }
        }
        //return next.handle(request);
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {

                let errorMessage = 'Ocurrió un error';
                // Manejar diferentes códigos de error HTTP
                switch (error.status) {
                    case 0:
                        errorMessage = 'No se pudo conectar con el servidor';
                        return throwError(() => new Error(errorMessage));
                    case 401:
                    case 403:
                        this.sessionService.logout();
                        return throwError(() => error);
                    case 404:
                        if (error.url?.includes('localhost')) {
                            return of(new HttpResponse({ status: 200, body: null }));
                        }
                        return throwError(() => error);
                    default:
                        return throwError(() => error);

                }
            })
        );
    }
}