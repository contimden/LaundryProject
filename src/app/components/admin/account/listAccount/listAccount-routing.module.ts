import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListAccountComponent } from './listAccount.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListAccountComponent }
    ])],
    exports: [RouterModule]
})
export class ListAccountRoutingModule { }
    