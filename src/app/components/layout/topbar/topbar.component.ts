import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../../../services/layout.service';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
})
export class TopBarComponent {
  // items!: MenuItem[];
  visibleProfile: boolean = false;
  accounts: Account[];
  account: Account;
  updateAccountForm: FormGroup;
  items: MenuItem[] | undefined;
  id: number

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    public accountService: AccountService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = localStorage.getItem('id')
    this.id = parseInt(id)
    this.accountService.findById(this.id).then(
      (res) => {
        this.account = res as Account;
      },
      (err) => {
        console.log(err);
      }
    );
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

  showDialog() {
    this.visibleProfile = true;
    console.log(this.account)
    this.updateAccountForm = this.formBuilder.group({
      id: this.account.id,
      fullname: this.account.fullname,
      phone: this.account.phone,
      email: this.account.email,
      photo: this.account.photo,
      dob: this.account.dob,
      type: this.account.type,
      address: this.account.address
    });
    console.log(this.account);
  }

  logout() {
    localStorage.clear();
  }

  save() {}

  changePassword() {
    this.accountService.resetPassword(this.account.username, this.account.email)
  }
}
