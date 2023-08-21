import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../../services/layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'Account', icon: 'pi pi-fw pi-home', routerLink: ['/account/account'] }
                ]
            },
            {
                label: 'Services',
                items: [
                    { label: 'Laundry serivces', icon: 'pi pi-fw pi-th-large', routerLink: ['/laundry/laundry-services'] },
                    // { label: 'List invoices', icon: 'pi pi-fw pi-file', routerLink: ['/invoices/list-invoices'] },
                ]
            },
            {
                label: 'Invoices',
                items: [
                    { label: 'List invoices', icon: 'pi pi-fw pi-file', routerLink: ['/invoices/list-invoices'] },
                ]
            },
        ];
    }
}
