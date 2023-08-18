import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Invoices } from 'src/app/models/invoices.model';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  templateUrl: './listInvoices.component.html',
})
export class ListInvoicesComponent implements OnInit {
  invoiceForm: FormGroup;
  invoices: Invoices[]
  isEditng: boolean
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
  ) {}

  ngOnInit() {
    this.invoices = this.invoicesService.findAll();
    this.isEditng = false
    this.paidMoney = 0
  }

  getDeliveryStatusVariant(invoices: Invoices) {
    switch (invoices.deliveryStatus) {
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

  getPaidStatusVariant(invoices: Invoices) {
    switch (invoices.paidStatus) {
      case 1:
        return 'warning';

      case 2:
        return 'success';

      default:
        return null;
    }
  }

  getPaidStatusName(status: number) {
    let statusName = '';
    if (status == 1) statusName = 'Remain';
    else if (status == 2) statusName = 'Paid';
    return statusName;
  }

  getServiceName(id: number) {
    let statusName = '';
    if (id == 1) statusName = 'By weight';
    else if (id == 2) statusName = 'By pieces';
    else if (id == 3) statusName = 'By month';
    return statusName;
  }

  save() {
    console.log("a");
    
  }

  editRow(invoice: any) {
    this.isEditng = true
    this.invoiceId = invoice.invoiceId
    this.idAcc = invoice.idAcc
    this.owned = invoice.owned

    this.invoiceForm = this.formBuilder.group({
      invoiceId: invoice.invoiceId,
      idAcc: invoice.idAcc,
      created: invoice.created,
      total: invoice.total,
      paid: invoice.paid,
      owned: invoice.owned,
      expectedDate: invoice.expectedDate,
      completedDate: invoice.completedDate,
      description: invoice.description,
      deliveryStatus: invoice.deliveryStatus,
      paidStatus: invoice.paidStatus,
      paidMoney: this.paidMoney
    });

    console.log(invoice)
  }

  cancelEditing() {
    this.isEditng = false
  }
}
