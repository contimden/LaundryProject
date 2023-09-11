import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'list-services', loadChildren: () => import('../laundryServices/listServices/laundryServices.module').then(m => m.LaundryServicesModule) },
    ]),
  ],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
