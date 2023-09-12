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
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ItemImportComponent } from './itemsImport.component';
import { ImportRoutingModule } from './itemsImport-routing.module';

@NgModule({
    imports: [
        ImportRoutingModule,
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
    ],
    declarations: [ItemImportComponent],
    providers: [
        MessageService,
        DatePipe
      ],
})
export class ItemImportModule { }
