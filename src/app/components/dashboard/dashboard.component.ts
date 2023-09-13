import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Account } from 'src/app/models/account.model';
import { Invoices } from 'src/app/models/invoices.model';
import { Item } from 'src/app/models/item.model';
import { AccountService } from 'src/app/services/account.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  templateUrl: './dashboard.component.html',
  styles: [`
    .p-inputnumber: {
      width: 100%;
    }
  `]
})
export class DashboardComponent implements OnInit {
  
  invoiceNumber: number;
  numberAccount: number;
  total: any;
  totalItem: number;
  itemnumber: number;
  items: Item[];
  chartData: any;
  chartOptions: any;
  type: number

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private invoicesService: InvoicesService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    const type = localStorage.getItem('type');
    this.type = parseInt(type);
    this.invoicesService.findAll().then(
      (res) => {        
        var invoices = res as Invoices[];
        this.invoiceNumber = invoices.length;
        var ttotal = 0;
        for(var i = 0; i < this.invoiceNumber; i++){
          ttotal += invoices[i].paid
        }
        this.total = ttotal;
      },
      (err) => {
        console.log(err);
      }
      
    );
    this.accountService.findAll().then(
      (res) => {        
        var account = res as Account[];
        this.numberAccount = account.length;
        
      },
      (err) => {
        console.log(err);
      }
    );

    this.itemService.findAll().then(
      (res) => {        
        var item = res as Item[];
        this.items = res as Item[];
        this.itemnumber = item.length;
        var ttotal = 0;
        for(var i = 0; i < item.length; i++){
          ttotal += (item[i].price*item[i].quantity)
        }
        this.totalItem = ttotal;
        
      },
      (err) => {
        console.log(err);
      }
    );
    
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
  
        labels: [ 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [
            {
                label: 'Invoice',
                data: [0, 0, 0, 0, 0, 0, 2],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                tension: .4
            },
            {
                label: 'User',
                data: [0, 0, 0, 0, 0, 0, 4],
                fill: false,
                backgroundColor: documentStyle.getPropertyValue('--green-600'),
                borderColor: documentStyle.getPropertyValue('--green-600'),
                tension: .4
            }
        ]
    };

    this.chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
    
  }

  


  
  
}
