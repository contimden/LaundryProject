import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'list-invoices', loadChildren: () => import('./listInvoices/listInvoices.module').then(m => m.ListInvoicesModule) },
    ]),
  ],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
