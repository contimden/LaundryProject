import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invoices } from 'src/app/models/invoices.model';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  templateUrl: './login.component.html',
  styles: [`
    .p-inputnumber: {
      width: 100%;
    }
  `]
})
export class LoginComponent implements OnInit {
  password: string
  constructor(

  ) {}

  ngOnInit() {

  }

}
