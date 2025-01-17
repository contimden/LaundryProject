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
import {StyleClassModule} from 'primeng/styleclass';
import { LaundryServicesService } from './services/laundryService.service';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceDetailService } from './services/invoiceDetail.service';
import { LayoutModule } from './components/layout/layout.module';
import { ItemService } from './services/item.service';
import { ItemImportService } from './services/itemsImport.service';


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
    HttpClientModule
  ],
  providers: [
    InvoicesService,
    AccountService,
    BaseURLService,
    MessageService,
    ConfirmationService,
    LaundryServicesService,
    InvoiceDetailService,
    ItemService,
    ItemImportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
