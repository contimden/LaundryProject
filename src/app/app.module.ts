import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './components/layout/layout.module';
import { InvoicesService } from './services/invoices.service';
import { AccountService } from './services/account.service';
import { AccountAPIService } from './services/accountAPI.service';
import { BaseURLService } from './services/baseURL.service';
import { InvoicesAPIService } from './services/invoicesAPI.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
  ],
  providers: [
    InvoicesService,
    AccountService,
    BaseURLService,
    AccountAPIService,
    InvoicesAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
