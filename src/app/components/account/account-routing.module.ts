import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'account', loadChildren: () => import('./listAccount/listAccount.module').then(m => m.ListAccountModule) },
    ]),
  ],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
