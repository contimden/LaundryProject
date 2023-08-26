import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemsComponent } from './listItems.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListItemsComponent }
    ])],
    exports: [RouterModule]
})
export class ListInvoicesRoutingModule { }
