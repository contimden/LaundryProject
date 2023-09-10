import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InvoicesService } from './services/invoices.service';
import { AccountService } from './services/account.service';
import { BaseURLService } from './services/base_URL.service';
import { LayoutModule } from './components/admin/layout/layout.module';
import {StyleClassModule} from 'primeng/styleclass';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfirmDialogModule,
    ToastModule,
    LayoutModule,
    
  ],
  providers: [
    InvoicesService,
    AccountService,
    BaseURLService,
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
