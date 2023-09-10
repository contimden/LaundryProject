import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/admin/layout/layout.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      
      {
        path: 'admin', component: LayoutComponent,
        children: [
          // { path: 'admin', loadChildren: () => import('./components/auth').then(m => m.DashboardModule) },
          { path: 'laundry', loadChildren: () => import('./components/admin/laundryServices/laundryServices.module').then(m => m.LaundryServicesModule) },
          { path: 'invoices', loadChildren: () => import('./components/admin/invoices/invoices.module').then(m => m.InvoicesModule) },
          { path: 'account', loadChildren: () => import('./components/admin/account/account.module').then(m => m.AccountModule) },
        ],
      },
      { path: 'login', loadChildren: () => import('./components/admin/auth/login/login.module').then(m => m.LoginModule) },
      { path: '', loadChildren: () => import('./components/admin/auth/login/login.module').then(m => m.LoginModule) },
     
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
