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
  editPhoto: string
  dobString: string
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
    console.log(account);

    const dateString = account.dob; // Oct 23
    const dateParts = dateString.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]); 
    this.dobString = dateString

    this.accountForm = this.formBuilder.group({
      id: account.id,
      username: account.username,
      password: account.password,
      fullname: account.fullname,
      phone: account.phone,
      email: account.email,
      photo: account.photo,
      dob: dateObject,
      securitycode: account.securitycode,
      type: account.type,
      address: account.address,
    });

    this.editPhoto = account.photo
  }

  cancelEditing() {
    this.contentVisible = false;
    this.isEditing = false;
  }

  selectFile(evt: any) {
    this.file = evt.files[0];
  }

  updateAccount() {
    var account: Account = this.accountForm.value as Account;
    account.dob = this.dobString
    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('strAccount', JSON.stringify(account));
    
    this.accountService.update(formData).then(
      (res) => {
        var result: any = res as any;
        console.log(result)
        if (result.status) {
          const newAccountInfo = {
            id: result.account.id,
            fullname: result.account.fullname,
            phone: result.account.phone,
            email: result.account.email,
            photo: "http://localhost:5231//images/account/" + result.account.photo,
            dob: result.account.dob,
            address: result.account.address,
            username: result.account.username,
            password: result.account.password,
            securitycode: result.account.securitycode,
            type: result.account.type
          };
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Account updated successful',
            life: 1000
          });
          let index = this.accounts.findIndex(el => el.id == result.account.id)
          this.accounts.splice(index, 1, newAccountInfo)
          
          this.contentVisible = false;
          this.isEditing = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Account updated failed',
            life: 1000
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Account updated failed 2',
          life: 1000
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


  addRow() {
    this.contentVisible = !this.contentVisible
    console.log(this.contentVisible)
    this.accountForm = this.formBuilder.group({
      username: null,
      password: null,
      fullname: "",
      phone: "",
      email: null,
      photo: "noimage.jpg",
      dob: null,
      securitycode: (Math.floor(100000 + Math.random() * 900000)).toString(),
      type: 0,
      address: ""
    });
  }

  addAccount() {
    var account: Account = this.accountForm.value as Account;
    this.accountService.findByUsername(account.username).then(
      (res) => {
        var result: any = res as any;
        if(result) {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Username da ton tai',
            life: 1000
          });
        } else {
          var formData = new FormData();
          formData.append('file', this.file);
          formData.append('strAccount', JSON.stringify(account));
          
          this.accountService.create(formData).then(
            (res) => {
              var result: any = res as any;
              if (result.status) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Successful',
                  detail: 'Account created successful',
                  life: 1000
                });
                this.contentVisible = false;
                this.isEditing = false;
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Account created failed',
                  life: 1000
                });
              }
            },
            (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Account created failed 2',
                life: 1000
              });
            }
          );
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }
}
