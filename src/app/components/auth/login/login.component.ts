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
  styles: [`
    .p-inputnumber: {
      width: 100%;
    }
  `]
})
export class LoginComponent implements OnInit {
  
  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private accountSerivce: AccountService,
    private router: Router,
    private msg: MessageService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
            username: "",
            password: ""
  });
  }
  login(){
    var username =  this.loginForm.value.username;
    var password =  this.loginForm.value.password;
   this.accountSerivce.login(username, password).then(
      res =>{
        var result: any = res as any;
        if(result.status){
          localStorage.setItem('userkey', username);
          this.router.navigate(['/admin']);
          } else{
            this.msg.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Login failed',
            })
        }
    },
      err => {
          console.log(err);
      }
   );
    
  
    
  }

}
