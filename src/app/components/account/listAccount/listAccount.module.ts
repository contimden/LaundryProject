import { NgModule } from '@angular/core';
import { ListAccountComponent } from './listAccount.component';
import { ListAccountRoutingModule } from './listAccount-routing.module';
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

@NgModule({
    imports: [
        ListAccountRoutingModule,
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
    declarations: [ListAccountComponent],
    providers: [MessageService]
})
export class ListAccountModule { }
