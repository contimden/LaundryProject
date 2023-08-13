import { NgModule } from '@angular/core';
import { ListInvoicesComponent } from './listInvoices.component';
import { ListInvoicesComponentRoutingModule } from './listInvoices-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        ListInvoicesComponentRoutingModule,
        CommonModule
    ],
    declarations: [ListInvoicesComponent]
})
export class ListInvoicesModule { }
