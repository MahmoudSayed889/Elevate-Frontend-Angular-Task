import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';

import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors(
        [loaderInterceptor]
      )
    ),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    })
  ]
};
