import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InvoiceDetailsComponent } from './invoiceDetails.component';
import { InvoiceDetailsRoutingModule } from './invoiceDetails-routing.module';

@NgModule({
    imports: [
      InvoiceDetailsRoutingModule,
        CommonModule,
        TableModule,
        TagModule,
        ButtonModule,
        StyleClassModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        FileUploadModule,
        HttpClientModule,
        MessagesModule,
        CalendarModule
    ],
    declarations: [InvoiceDetailsComponent],
    providers: [MessageService]
})

export class InvoiceDetailsModule {}