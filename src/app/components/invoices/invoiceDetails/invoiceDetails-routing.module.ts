import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InvoiceDetailsComponent } from './invoiceDetails.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: InvoiceDetailsComponent }
    ])],
    exports: [RouterModule]
})
export class InvoiceDetailsRoutingModule { }