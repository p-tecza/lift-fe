import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  private username = 'user';
  private password = 'password';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const basicAuth = btoa(`${this.username}:${this.password}`);
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${basicAuth}`
      }
    });
    console.log(authReq)
    console.log("eeee")
    return next.handle(authReq);
  }
}
