import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Invoices } from 'src/app/models/invoices.model';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  templateUrl: './listInvoices.component.html',
  styles: [`
    .p-inputnumber: {
      width: 100%;
    }
  `]
})
export class ListInvoicesComponent implements OnInit {
  invoiceForm: FormGroup;
  invoices: Invoices[]
  invoice: Invoices
  contentVisible: boolean
  isEditing: boolean
  invoiceId: number
  idAcc: number
  owned: number
  paidMoney: number
  deliveryOptions: any[] = [
    { label: 'Pending', value: 1 },
    { label: 'Ready', value: 2 },
    { label: 'Delivered', value: 3 },
  ];

  paidOptions: any[] = [
    { label: 'Remain', value: 1 },
    { label: 'Paid', value: 2 },
  ];

  constructor(
    private invoicesService: InvoicesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public datepipe: DatePipe,
  ) {}

  ngOnInit() {
    this.invoicesService.findAll().then(
      (res) => {        
        this.invoices = res as Invoices[];
      },
      (err) => {
        console.log(err);
      }
    );    this.contentVisible = false
    this.paidMoney = 0
  }

  getDeliveryStatusVariant(invoices: Invoices) {
    switch (invoices.status) {
      case 1:
        return 'warning';

      case 2:
        return 'success';

      case 3:
        return 'primary';

      default:
        return null;
    }
  }

  getDeliveryStatusName(status: number) {
    let statusName = '';
    if (status == 1) statusName = 'Pending';
    else if (status == 2) statusName = 'Ready';
    else if (status == 3) statusName = 'Delivered';
    return statusName;
  }

  // getPaidStatusVariant(invoices: Invoices) {
  //   switch (invoices.paidStatus) {
  //     case 1:
  //       return 'warning';

  //     case 2:
  //       return 'success';

  //     default:
  //       return null;
  //   }
  // }

  // getPaidStatusName(status: number) {
  //   let statusName = '';
  //   if (status == 1) statusName = 'Remain';
  //   else if (status == 2) statusName = 'Paid';
  //   return statusName;
  // }

  getServiceName(id: number) {
    let statusName = '';
    if (id == 1) statusName = 'By weight';
    else if (id == 2) statusName = 'By pieces';
    else if (id == 3) statusName = 'By month';
    return statusName;
  }

  editRow(invoice: any) {
    this.contentVisible = true
    this.isEditing = true
    // this.invoiceId = invoice.invoiceId
    // this.idAcc = invoice.idacc
    // this.owned = invoice.owned
    console.log(invoice)
    this.invoiceForm = this.formBuilder.group({
      idacc: invoice.idacc,
      created: invoice.created,
      total: invoice.total,
      paid: invoice.paid,
      owned: invoice.owned,
      expectdate: new Date(invoice.expectdate),
      completeddate: new Date(invoice.completeddate),
      description: invoice.description,
      status: invoice.status,
    });
  }

  cancelEditing() {
    this.contentVisible = false
    this.isEditing = false
  }

  addRow() {
    this.contentVisible = !this.contentVisible
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
    this.invoicesService.create(invoice).then(
        res => {
            var result: any = res as any;
            if (result.status) {
                // this.router.navigate(['/']);
                console.log(result);
                this.invoices.unshift(result.invoice)
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Cap nhat San Pham That Bai 1'
                });
            }
        },
        err => {
            this.messageService.add({
                severity: 'error',
                summary: 'Failed',
                detail: 'Cap nhat San Pham That Bai 2'
            });
        }
    );
  }

  save() {
    // var invoice: Invoices = this.invoiceForm.value as Invoices;
    // invoice.idacc = this.invoice.idacc;
    // this.invoicesService.create(invoice).then(
    //     res => {
    //         var result: any = res as any;
    //         if (result.status) {
    //             // this.router.navigate(['/']);
    //             console.log("a");
    //         } else {
    //             this.messageService.add({
    //                 severity: 'error',
    //                 summary: 'Failed',
    //                 detail: 'Cap nhat San Pham That Bai 1'
    //             });
    //         }
    //     },
    //     err => {
    //         this.messageService.add({
    //             severity: 'error',
    //             summary: 'Failed',
    //             detail: 'Cap nhat San Pham That Bai 2'
    //         });
    //     }
    // );
  }
}
