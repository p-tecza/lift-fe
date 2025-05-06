import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {AuthInterceptorService} from "./lift/auth/auth-interceptor.service";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const username = 'user';
          const password = 'password';
          const basicAuth = btoa(`${username}:${password}`);
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Basic ${basicAuth}`
            }
          });

          console.log("EAEA")
          console.log(authReq)
          return next(authReq);
        }
      ])
    )]
};
