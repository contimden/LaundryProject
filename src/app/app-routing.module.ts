import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '', component: LayoutComponent,
        children: [
          { path: 'services', loadChildren: () => import('./components/laundryServices/laundryServices.module').then(m => m.ServicesModule) },
          { path: 'invoices', loadChildren: () => import('./components/invoices/invoices.module').then(m => m.InvoicesModule) },
          { path: 'account', loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule) },
          { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule) },
        ],
      },
      { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
      { path: 'dashboard', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
     
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
