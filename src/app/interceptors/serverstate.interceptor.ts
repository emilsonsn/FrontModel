import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';

@Injectable()
export class ServerstateInterceptor implements HttpInterceptor {

  constructor(private state: TransferState) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            this.state.set(makeStateKey(request.url), event.body);
          }
        })
      );
  }
}
