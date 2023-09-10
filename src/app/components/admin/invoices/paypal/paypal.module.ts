import { NgModule } from '@angular/core';
import { PaypalComponent } from './paypal.component';
import { PaypalRoutingModule } from './paypal-routing.module';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
    imports: [
        PaypalRoutingModule,
        CommonModule,
        TableModule,
        TagModule,
        ButtonModule,
        StyleClassModule,
        FormsModule,
        ReactiveFormsModule,
        InputTextModule,
        InputNumberModule,
        DropdownModule,
        NgxPayPalModule
    ],
    declarations: [PaypalComponent]
})
export class PaypalModule { }
