import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { GetDetails } from './get-details/get-details';
import { GetBalance } from './get-balance/get-balance';
import { Accountinfo } from './accountinfo/accountinfo';
import { Login } from './login/login';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpInterceptor } from './httpinterceptor';
import { Transfer } from './transfer/transfer';
import { History } from './history/history';

@NgModule({
  declarations: [
    App,
    GetDetails,
    GetBalance,
    Accountinfo,
    Login,
    Transfer,
    History,
    //Login
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    RouterModule.forRoot([]),
    FormsModule
  ],

  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([HttpInterceptor]),
    ),
  ],
  bootstrap: [App]
})

export class AppModule { }
