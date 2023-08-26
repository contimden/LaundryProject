import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'list-invoices', loadChildren: () => import('./listInvoices/listInvoices.module').then(m => m.ListInvoicesModule) },
      { path: 'paypal', loadChildren: () => import('./paypal/paypal.module').then(m => m.PaypalModule) },
      { path: 'list-items', loadChildren: () => import('./listItems/listItems.module').then(m => m.ListItemsModule) },
    ]),
  ],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
