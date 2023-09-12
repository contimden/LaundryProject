import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { PaypalModule } from './paypal/paypal.module';
import { ListItemsModule } from './listItems/listItems.module';
import { ItemImportModule } from './ItemsImport/itemsImport.module';

@NgModule({
	imports: [
		CommonModule,
		InvoicesRoutingModule,
		PaypalModule,
		ListItemsModule,
		ItemImportModule
	]
})
export class InvoicesModule { }