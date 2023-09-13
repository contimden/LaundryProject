import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Invoices } from 'src/app/models/invoices.model';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  templateUrl: './listInvoices.component.html',
  styles: [
    `
      .p-inputnumber: {
        width: 100%;
      }
    `,
  ],
})
export class ListInvoicesComponent implements OnInit {
  invoiceForm: FormGroup;
  invoices: Invoices[];
  invoice: Invoices;
  contentVisible: boolean;
  isEditing: boolean;
  invoiceId: number;
  idAcc: number;
  owned: number;
  paidMoney: number;
  deliveryOptions: any[] = [
    { label: 'New', value: 1 },
    { label: 'Picked up', value: 2 },
    { label: 'Washed', value: 3 },
    { label: 'Delivered', value: 4 },
  ];
  type: number
  id: number
  expectdateString : string
  completeddateString: string

  constructor(
    private invoicesService: InvoicesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit() {
    const type = localStorage.getItem('type');
    const id = localStorage.getItem('id');
    this.type = parseInt(type);
    this.id = parseInt(id);
    if (this.type == 4) {
      this.invoicesService.findAll().then(
        (res) => {
          this.invoices = res as Invoices[];
          console.log(this.invoices);
          
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      this.invoicesService.findByIdAcc(parseInt(id)).then(
        (res) => {
          this.invoices = res as Invoices[];
        },
        (err) => {
          console.log(err);
        }
      );
    }
    this.contentVisible = false;
  }

  getDeliveryStatusVariant(invoices: Invoices) {
    switch (invoices.status) {
      case 1:
        return 'danger';

      case 2:
        return 'warning';

      case 3:
        return 'primary';

      case 4:
        return 'success';

      default:
        return null;
    }
  }

  getDeliveryStatusName(status: number) {
    let statusName = '';
    if (status == 1) statusName = 'New';
    else if (status == 2) statusName = 'Picked up';
    else if (status == 3) statusName = 'Washed';
    else if (status == 4) statusName = 'Delivered';
    return statusName;
  }

  getServiceName(id: number) {
    let statusName = '';
    if (id == 1) statusName = 'By weight';
    else if (id == 2) statusName = 'By pieces';
    else if (id == 3) statusName = 'By month';
    return statusName;
  }

  cancelEditing() {
    this.contentVisible = false;
    this.isEditing = false;
  }

  addRow() {
    this.contentVisible = !this.contentVisible;
    this.invoiceForm = this.formBuilder.group({
      idacc: null,
      created: new Date(),
      total: null,
      paid: null,
      owned: null,
      expectdate: null,
      completeddate: null,
      description: null,
      status: 1,
    });
  }

  addInvoice() {
    var invoice: Invoices = this.invoiceForm.value as Invoices;
    invoice.expectdate = this.datepipe.transform(
      invoice.expectdate,
      'dd/MM/yyyy'
    );
    invoice.completeddate = invoice.expectdate;
    invoice.created = this.datepipe.transform(invoice.created, 'dd/MM/yyyy');
    invoice.total = 0;
    invoice.paid = 0;
    invoice.owned = invoice.total - invoice.paid;

    if (this.type < 4) invoice.idacc = this.id;
    console.log(invoice);
    
    
    this.invoicesService.create(invoice).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          console.log(result);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Add invoice successful',
            life: 1000
          });
          this.contentVisible = false
          // this.invoices.unshift(result.invoice)
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Add invoice failed',
            life: 1000,
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Add invoice failed',
          life: 1000,
        });
      }
    );
  }

  editRow(invoice: any) {    
    this.contentVisible = true;
    this.isEditing = true;

    const dateString = invoice.expectdate; // Oct 23
    const dateParts = dateString.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    const dateObject = new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]); 
    this.expectdateString = dateString

    const dateString2 = invoice.expectdate; // Oct 23
    const dateParts2 = dateString2.split("/");
    // month is 0-based, that's why we need dataParts[1] - 1
    const dateObject2 = new Date(+dateParts2[2], +dateParts2[1] - 1, +dateParts2[0]); 
    this.completeddateString = dateString

    this.invoiceForm = this.formBuilder.group({
      id: invoice.id,
      idacc: invoice.idacc,
      created: invoice.created,
      total: invoice.total,
      paid: 0,
      owned: invoice.owned,
      expectdate: dateObject,
      completeddate: dateObject2,
      description: invoice.description,
      status: invoice.status,
    });
    this.paidMoney = invoice.paid
    this.owned = invoice.total - invoice.paid
  }

  updateInvoice() {
    var invoice: Invoices = this.invoiceForm.value as Invoices;
    invoice.paid += this.paidMoney
    if(invoice.status == 4 && invoice.total > invoice.paid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'The customer not pay enough money',
        life: 1000
      });
      invoice.paid -= this.paidMoney
    } else if(invoice.total < invoice.paid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Failed',
        detail: 'Please return the excess money to the customer',
        life: 1000
      });
      invoice.paid -= this.paidMoney
    } else {
      invoice.expectdate = this.expectdateString
      invoice.completeddate = this.completeddateString

      if(invoice.status == 4) {
        const date = new Date()
        invoice.completeddate = this.datepipe.transform(date, 'dd/MM/yyyy')
      }
      
      this.invoicesService.update(invoice).then(
        (res) => {
          var result: any = res as any;
          if (result) {
            const newInvoice = {
              id: result.invoice.id,
              idacc: result.invoice.idacc,
              created: result.invoice.created,
              total: result.invoice.total,
              paid: result.invoice.paid,
              owned: result.invoice.owned,
              expectdate: result.invoice.expectdate,
              completeddate: result.invoice.completeddate,
              description: result.invoice.description,
              status: invoice.status,
            };
            let index = this.invoices.findIndex(el => el.id == result.invoice.id)
            this.invoices.splice(index, 1, newInvoice)
  
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Update invoice successful',
              life: 1000
            });
            this.contentVisible = false
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Update invoice failed',
              life: 1000
            });
          }
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Update invoice failed 2',
            life: 1000
          });
        }
      );
    }
  }

  viewInvoiceDetail(invoice: any) {
    this.router.navigate(['/invoices/invoice-details', { id: invoice.id }]);
  }
}