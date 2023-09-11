import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './listAccount.component.html',
  styles: [
    `
      ::ng-deep .input-styling input {
        width: 20px !important;
      }
    `,
  ],
})
export class ListAccountComponent implements OnInit {
  accounts: Account[];
  account: Account;
  contentVisible: boolean;
  isEditing: boolean;
  accountForm: FormGroup;
  file: File;
  accountType: any[] = [
    { label: 'Not activate', value: 0 },
    { label: 'Activate', value: 1 },
    { label: 'VIP', value: 2 },
    { label: 'Admin', value: 4 },
  ];

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.accountService.findAll().then(
      (res) => {
        this.accounts = res as Account[];
      },
      (err) => {
        console.log(err);
      }
    );

    this.contentVisible = false;
  }

  editRow(account: any) {
    this.contentVisible = true;
    this.isEditing = true;

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
      address: account.address,
    });
  }

  cancelEditing() {
    this.contentVisible = false;
    this.isEditing = false;
  }

  selectFile(evt: any) {
    this.file = evt.files[0];
  }

  save() {
    var account: Account = this.accountForm.value as Account;
    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('strAccount', JSON.stringify(account));
    this.accountService.update(formData).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Account updated',
            life: 3000
          });
          this.contentVisible = false;
          this.isEditing = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Cap nhat Account That Bai 1',
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Cap nhat Account That Bai 2',
        });
      }
    );
  }

  getAccountTypeVariant(account: Account) {
    switch (account.type) {
      case 0:
        return 'danger';

      case 1:
        return 'success';

      case 2:
        return 'warning';

      case 4:
        return 'primary';

      default:
        return null;
    }
  }

  getAccountTypeName(type: number) {
    let typeName = '';
    if (type == 0) typeName = 'Not activate';
    else if (type == 1) typeName = 'Activate';
    else if (type == 2) typeName = 'VIP';
    else if (type == 4) typeName = 'Admin';
    return typeName;
  }
}
