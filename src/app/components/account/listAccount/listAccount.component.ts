import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { MessageService } from "primeng/api";

@Component({
  templateUrl: './listAccount.component.html',
  styles: [`
    ::ng-deep .input-styling input {
      width: 20px !important;
    }
  `]
})
export class ListAccountComponent implements OnInit {
  accounts: Account[]
  account: Account
  contentVisible: boolean
  isEditing: boolean
  accountForm: FormGroup;
  file: File;

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

    this.contentVisible = false
  }

  editRow(account: any) {
    this.contentVisible = true
    this.isEditing = true

    this.accountForm = this.formBuilder.group({
      id: account.id,
      username: account.username,
      password: account.password,
      fullname: account.fullname,
      phone: account.phone,
      email: account.email,
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

  selectFile(evt: any) {
    this.file = evt.files[0];
  }

  save() {
    var account: Account = this.accountForm.value as Account;
    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('strAccount', JSON.stringify(account));
    this.accountService.update(formData).then(
        res => {
            var result: any = res as any;
            if (result.status) {
              console.log("a")
                // this.router.navigate(['/']);
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Cap nhat San Pham That Bai 1'
                });
            }
        },
        err => {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Cap nhat San Pham That Bai 2'
            });
        }
    );
  }
}
