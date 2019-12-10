import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AdminModule} from './admin/admin.module';
import {SurveyModule} from './survey/survey.module';
import {JwtModule} from '@auth0/angular-jwt';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {TokenInterceptor} from './interceptors/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AdminModule,
    SurveyModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtGetter,
        whitelistedDomains: [environment.apiDomain, environment.apiUrl],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

export function jwtGetter(): string {
  return localStorage.getItem('token');
}
