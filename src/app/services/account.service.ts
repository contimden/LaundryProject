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
        fullname: "Test 1",
        phone: "12345",
        email: "test1@gmail.com",
        photo: "1.jpeg",
        dob: "2023-01-02",
        securitycode: "123",
        type: 1,
        address: "Số 10 Xô Viết Nghệ Tĩnh, Phường Nguyễn Du, Thành phố Hà Tĩnh, Tỉnh Hà Tĩnh",
      },
      {
        id: 2,
        username: "abc",
        password: "13",
        fullname: "Test 2",
        phone: "12346",
        email: "test2@gmail.com",
        photo: "2.jpg",
        dob: "2023-01-02",
        securitycode: "123",
        type: 2,
        address: "Số 10 Xô Viết Nghệ Tĩnh, Phường Nguyễn Du, Thành phố Hà Tĩnh, Tỉnh Hà Tĩnh",
      },
      {
        id: 3,
        username: "abc",
        password: "13",
        fullname: "Test 3",
        phone: "12347",
        email: "test3@gmail.com",
        photo: "3.jpeg",
        dob: "2023-01-02",
        securitycode: "123",
        type: 1,
        address: "Số 10 Xô Viết Nghệ Tĩnh, Phường Nguyễn Du, Thành phố Hà Tĩnh, Tỉnh Hà Tĩnh",
      },
      {
        id: 4,
        username: "abc",
        password: "13",
        fullname: "Test 4",
        phone: "12348",
        email: "test4@gmail.com",
        photo: "4.jpeg",
        dob: "2023-01-02",
        securitycode: "123",
        type: 2,
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