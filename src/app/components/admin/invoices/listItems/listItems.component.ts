import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invoices } from 'src/app/models/invoices.model';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  templateUrl: './listItems.component.html',
  styles: [`
    .p-inputnumber: {
      width: 100%;
    }
  `]
})
export class ListItemsComponent implements OnInit {

  constructor(

  ) {}

  ngOnInit() {

  }
}
