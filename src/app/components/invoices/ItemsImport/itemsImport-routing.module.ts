import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemImportComponent } from './itemsImport.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ItemImportComponent }
    ])],
    exports: [RouterModule]
})
export class ImportRoutingModule { }
