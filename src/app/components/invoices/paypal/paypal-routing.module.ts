import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaypalComponent } from './paypal.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PaypalComponent }
    ])],
    exports: [RouterModule]
})
export class PaypalRoutingModule { }
