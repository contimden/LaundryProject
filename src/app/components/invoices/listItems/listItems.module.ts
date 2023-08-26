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
        DropdownModule
    ],
    declarations: [ListItemsComponent]
})
export class ListItemsModule { }
