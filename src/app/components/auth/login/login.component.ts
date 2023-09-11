import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Account } from 'src/app/models/account.model';
import { Invoices } from 'src/app/models/invoices.model';
import { AccountService } from 'src/app/services/account.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  registerForm: FormGroup
  account: Account
  registerVisible: boolean
  file: File;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: '',
    });

    this.registerForm = this.formBuilder.group({
      username: '',
      password: '',
      email: ''
    });

    this.registerVisible = false
  }
  login() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const type = this.loginForm.value.type;
    this.accountService.login(username, password).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          console.log(result)
          this.accountService.findById(result.id).then(
            (res) => {
              const account = res as Account;
              console.log(this.account)
              localStorage.setItem('username', account.username);
              localStorage.setItem('type', account.type.toString());
              localStorage.setItem('id', account.id.toString());
              this.router.navigate(['/']);
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Login failed',
            life: 1000
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Login failed',
          life: 1000
        });
      }
    );
  }

  openRegister() {
    this.registerVisible = true
  }

  returnLogin() {
    this.registerVisible = false
  }

  register() {
    var account: Account = this.registerForm.value as Account;
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
          account.fullname = ""
          account.phone = ""
          account.photo = "noimage.jpg"
          account.dob = "01/01/2000"
          account.securitycode = (Math.floor(100000 + Math.random() * 900000)).toString()
          account.type = 0
          account.address = ""
          
          var formData = new FormData();
          formData.append('file', this.file);
          formData.append('strAccount', JSON.stringify(account));
          
          this.accountService.create(formData).then(
              res => {
                var result: any = res as any;
                console.log(result)
                if(result.status) {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Account created succesful',
                    life: 1000
                  });
                  this.registerVisible = false
                }
              },
              err => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Account created failed',
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
