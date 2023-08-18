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
  items!: MenuItem[];
  visibleProfile: boolean = false;
  accounts: Account[];
  account: Account;
  updateAccountForm: FormGroup

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    public accountService: AccountService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.account = this.accountService.find(1);
    this.updateAccountForm = this.formBuilder.group({
      id: 1,
      username: "abc",
      password: "13",
      fullname: "Test",
      phone: "09090909090",
      email: "test@gmail.com",
      photo: "4.jpeg",
      dob: "2023-01-02",
      securitycode: "123",
      type: "VIP",
      address: "Số 10 Xô Viết Nghệ Tĩnh, Phường Nguyễn Du, Thành phố Hà Tĩnh, Tỉnh Hà Tĩnh",
    });
  }

  showDialog() {
    this.visibleProfile = true;
    this.account = this.accountService.find(1);
    console.log(this.account);
  }

  save() {}
}
