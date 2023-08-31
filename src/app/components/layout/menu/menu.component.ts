import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  model: any[] = [];
  type: number
  id: number
  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    const type = localStorage.getItem('type')
    this.type = parseInt(type)
    this.model = [
      {
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/'],
          },
          {
            label: 'Account',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/account/account'],
            // visible: this.type == 4
          },
        ],
      },
      {
        label: 'Services',
        visible: this.type < 4,
        items: [
          {
            label: 'Laundry serivces',
            icon: 'pi pi-fw pi-th-large',
            routerLink: ['/laundry/laundry-services'],
            visible: this.type < 4
          },
          // { label: 'List invoices', icon: 'pi pi-fw pi-file', routerLink: ['/invoices/list-invoices'] },
        ],
      },
      {
        label: 'Invoices',
        items: [
          {
            label: 'List invoices',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/invoices/list-invoices'],
          },
          {
            label: 'List items',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/invoices/list-items'],
          },
        ],
      },
    ];
  }
}
