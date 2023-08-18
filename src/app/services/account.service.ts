import { Injectable } from "@angular/core";
import { Account } from "../models/account.model";

@Injectable()

export class AccountService {
  findAll(): Account[] {
    return [
      {
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
      },
    ];
  }
  find(id: number): Account {
    var accounts: Account[] = this.findAll();
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].id == id) {
            return accounts[i];
        }
    }
    return null;
  }
}