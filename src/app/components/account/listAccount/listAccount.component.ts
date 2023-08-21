import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  templateUrl: './listAccount.component.html',
  styles: [`
    ::ng-deep .input-styling input {
      width: 20px !important;
    }
  `]
})
export class ListAccountComponent implements OnInit {
  account: Account[]
  contentVisible: boolean
  isEditing: boolean
  accountForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.account = this.accountService.findAll();
    this.contentVisible = false
  }

  save() {
    console.log("a");
    
  }

  editRow(account: any) {
    this.contentVisible = true
    this.isEditing = true
    // this.invoiceId = invoice.invoiceId
    // this.idAcc = invoice.idAcc
    // this.owned = invoice.owned

    this.accountForm = this.formBuilder.group({
      id: account.id,
      username: account.username,
      password: account.password,
      fullname: account.fullname,
      phone: account.phone,
      email: account.email,
      photo: account.photo,
      dob: account.dob,
      securitycode: account.securitycode,
      type: account.type,
      address: account.address
    });
  }

  cancelEditing() {
    this.contentVisible = false
    this.isEditing = false
  }

  addAccount() {
    this.contentVisible = !this.contentVisible
    console.log(this.contentVisible)
    this.accountForm = this.formBuilder.group({
      id: null,
      username: null,
      password: null,
      fullname: null,
      phone: null,
      email: null,
      photo: null,
      dob: null,
      securitycode: null,
      type: null,
      address: null
    });
  }
}
