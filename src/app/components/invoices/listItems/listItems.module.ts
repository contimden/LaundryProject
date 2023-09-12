import { NgModule } from '@angular/core';
import { ListItemsComponent } from './listItems.component';
import { ListInvoicesRoutingModule } from './listItems-routing.module';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
        FileUploadModule,
        MessagesModule,
        DialogModule,
        ConfirmDialogModule,
        
        
    ],
    declarations: [ListItemsComponent],
    providers: [
        MessageService,
        DatePipe,
        ConfirmationService
      ],
})
export class ListItemsModule { }
