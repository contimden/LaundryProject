import { NgModule } from '@angular/core';
import { LaundryServicesComponent } from './laundryServices.component';
import { LaundryServicesRoutingModule } from './laundryServices-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        LaundryServicesRoutingModule,
        CommonModule
    ],
    declarations: [LaundryServicesComponent]
})
export class LaundryServicesModule { }
