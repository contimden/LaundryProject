import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'invoices', loadChildren: () => import('./listInvoices/listInvoices.module').then(m => m.ListInvoicesModule) },
      { path: 'paypal', loadChildren: () => import('./paypal/paypal.module').then(m => m.PaypalModule) },
      { path: 'list-items', loadChildren: () => import('./listItems/listItems.module').then(m => m.ListItemsModule) },
      { path: 'items-import', loadChildren: () => import('./ItemsImport/itemsImport.module').then(m => m.ItemImportModule) },
      { path: 'invoice-details', loadChildren: () => import('./invoiceDetails/invoiceDetails.module').then(m => m.InvoiceDetailsModule) },
    ]),
  ],
  exports: [RouterModule],
})
export class InvoicesRoutingModule {}
