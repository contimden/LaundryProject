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
        label: 'Home',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/dashboard'],
          },
          {
            label: 'Account',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/account/account'],
            visible: this.type == 4
          },
        ],
      },
      {
        label: 'Services',
        items: [
          {
            label: 'Laundry serivces',
            icon: 'pi pi-fw pi-th-large',
            routerLink: ['/services/list-services'],
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
      },
    ];
  }
}
