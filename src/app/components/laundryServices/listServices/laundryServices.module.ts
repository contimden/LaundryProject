import { NgModule } from '@angular/core';
import { LaundryServicesComponent } from './laundryServices.component';
import { LaundryServicesRoutingModule } from './laundryServices-routing.module';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPayPalModule } from 'ngx-paypal';


@NgModule({
  imports: [
    LaundryServicesRoutingModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    TableModule,
    TagModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule,
    FileUploadModule,
    ToastModule,
    ConfirmDialogModule,
    InputTextModule,
    FileUploadModule,
    NgxPayPalModule
  ],
  declarations: [LaundryServicesComponent],
  providers: [MessageService, DatePipe],
})
export class LaundryServicesModule {}
