import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListInvoicesComponent } from './listInvoices.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list-invoices', component: ListInvoicesComponent }
    ])],
    exports: [RouterModule]
})
export class ListInvoicesComponentRoutingModule { }
