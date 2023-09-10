import { NgModule } from '@angular/core';
import { ListInvoicesComponent } from './listInvoices.component';
import { ListInvoicesRoutingModule } from './listInvoices-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    ListInvoicesRoutingModule,
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
    MessagesModule,
    CalendarModule,
  ],
  declarations: [ListInvoicesComponent],
  providers: [
    MessageService,
    DatePipe
  ],
})
export class ListInvoicesModule {}
