import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserstateInterceptor } from './interceptors/browserstate.interceptor';
import { AuthInterceptorService } from '@services/auth-interceptor.service';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { APP_BASE_HREF, PlatformLocation, registerLocaleData } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
		AkitaNgRouterStoreModule,
    BrowserAnimationsModule,
    RouterModule,
    NgbModule,
    HttpClientModule,    
    ToastrModule.forRoot({
      positionClass :'toast-top-right'
    }),
    MatMomentDateModule,
    
  ],
  providers: [
		{ provide: 'LOCALSTORAGE', useFactory: getLocalStorage },
		{ provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: BrowserstateInterceptor, multi: true },
		{
			provide: APP_BASE_HREF,
			useFactory: (s: PlatformLocation) => s.getBaseHrefFromDOM(),
			deps: [PlatformLocation]
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function getLocalStorage() {
	return typeof window !== 'undefined' ? window.localStorage : null;
}
