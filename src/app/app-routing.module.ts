import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: LayoutComponent,
        children: [
          // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'laundry', loadChildren: () => import('./components/laundryServices/laundryServices.module').then(m => m.LaundryServicesModule) },
          { path: 'invoices', loadChildren: () => import('./components/listInvoices/listInvoices.module').then(m => m.ListInvoicesModule) },
      ]
      },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
