import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'admin', component: LayoutComponent,
        children: [
          // { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
          { path: 'laundry', loadChildren: () => import('./components/laundryServices/laundryServices.module').then(m => m.LaundryServicesModule) },
          { path: 'invoices', loadChildren: () => import('./components/invoices/invoices.module').then(m => m.InvoicesModule) },
          { path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule) },
        ],
      },
      { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
