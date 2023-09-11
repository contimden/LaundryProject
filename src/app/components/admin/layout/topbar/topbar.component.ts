import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from '../../../../services/layout.service';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopBarComponent {
  // items!: MenuItem[];
  contentVisible: boolean = false
  accounts: Account[]
  account: Account
  updateAccountForm: FormGroup
  items: MenuItem[] | undefined
  id: number
  file: File
  dobString: string

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    public accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    const id = localStorage.getItem('id');
    this.id = parseInt(id);
    if(id == null){
      this.router.navigate(['/login']);
    } else {
      this.accountService.findById(this.id).then(
        (res) => {
          this.account = res as Account;
          this.updateAccountForm = this.formBuilder.group({
            id: null,
            fullname: null,
            phone: null,
            email: null,
            photo: null,
            dob: null,
            type: null,
            address: null,
          });
        },
        (err) => {
          console.log(err);
        }
      );
      this.items = [
        {
          label: 'Users',
          icon: '',
          items: [
            {
              label: 'Profile',
              icon: 'pi pi-fw pi-user',
              command: () => this.showDialog(),
            },
            {
              label: 'Reset password',
              icon: 'pi pi-fw pi-cog',
              command: () => this.changePassword(),
            },
            {
              label: 'Logout',
              icon: 'pi pi-fw pi-power-off',
              command: () => this.logout(),
              routerLink: ['/login']
            },
          ],
        }
      ];
    }
    
  }

  showDialog() {
    this.contentVisible = true;
    console.log(this.account.dob)

    const dateString = this.account.dob; // Oct 23
    const dateParts = dateString.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]); 
    this.dobString = dateString

    this.updateAccountForm = this.formBuilder.group({
      id: this.account.id,
      fullname: this.account.fullname,
      phone: this.account.phone,
      email: this.account.email,
      photo: this.account.photo,
      dob: dateObject,
      type: this.account.type,
      address: this.account.address,
      password: this.account.password,
      username: this.account.username,
      securitycode: this.account.securitycode,
    });
    console.log(this.account);
  }

  logout() {
    localStorage.clear();
  }

  save() {
    var account: Account = this.updateAccountForm.value as Account;
    account.dob = this.dobString
    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('strAccount', JSON.stringify(account));
    
    this.accountService.update(formData).then(
      (res) => {
        var result: any = res as any;
        console.log(result)
        if (result.status) {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Account updated successful',
            life: 1000
          });
          this.contentVisible = false
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

  changePassword() {
    this.accountService.resetPassword(this.account.username, this.account.email)
  }

  selectFile(evt: any) {
    this.file = evt.files[0];
  }
}
