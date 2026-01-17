import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize, tap } from 'rxjs';


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const spinner = inject(NgxSpinnerService);

  // start
  spinner.show();

  return next(req).pipe(
    // stop
    finalize(() => {
      spinner.hide();
    })
  )
};
