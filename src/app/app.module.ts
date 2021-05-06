import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from './../environments/environment';
import { PublicPageComponent } from './components/public-page/public-page.component';
import { RestrictedPageComponent } from './components/restricted-page/restricted-page.component';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.AD_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${environment.AD_TENANT_ID}`,
      redirectUri: `${environment.AD_REDIRECT_URI}`,
      postLogoutRedirectUri: `${environment.AD_REDIRECT_URI}`,
      navigateToLoginRequestUrl: true
    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: true,
      secureCookies: true
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
    PublicPageComponent,
    RestrictedPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
