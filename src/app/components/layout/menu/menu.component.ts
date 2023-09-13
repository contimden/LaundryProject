import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  model: any[] = [];
  type: number;
  id: number;
  constructor(public layoutService: LayoutService) {}

  ngOnInit() {
    const type = localStorage.getItem('type');
    this.type = parseInt(type);
    this.model = [
      {
        label: '',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
          },

        ],
        visible: this.type == 4
      },
      {
        label: 'Account',
        items: [
          {
            label: this.type == 4 ? 'List account' : 'Account',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/account/account'],
          },
        ],
        visible: this.type == 4
      },
      {
        label: this.type == 4 ? 'Invoices' : 'Order',
        items: [
          {
            label: this.type == 4 ? 'List invoices' : 'Order',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/invoices/invoices'],
          },
        ],
      },
      {
        label: 'Item',
        items: [
          {
            label: 'List items',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/invoices/list-items'],
          },
          {
            label: 'Items Import',
            icon: 'pi pi-fw pi-file',
            routerLink: ['/invoices/items-import'],
          }
        ],
        visible: this.type == 4
      },
      {
        label: 'Services',
        items: [
          {
            label: 'Laundry serivces',
            icon: 'pi pi-fw pi-th-large',
            routerLink: ['/services/list-services'],
          },
        ],
      },
    ];
  }
}
