import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LaundryServicesComponent } from './laundryServices.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LaundryServicesComponent }
    ])],
    exports: [RouterModule]
})
export class LaundryServicesRoutingModule { }
