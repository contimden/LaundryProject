import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InvoiceDetail } from 'src/app/models/invoiceDetail.model';
import { InvoiceDetailService } from 'src/app/services/invoiceDetail.service';

@Component({
  templateUrl: './invoiceDetails.component.html',
  styles: [
    `
      .p-inputnumber: {
        width: 100%;
      }
    `,
  ],
})
export class InvoiceDetailsComponent implements OnInit {
  invoiceDetail: InvoiceDetail;
  invoiceDetails: InvoiceDetail[];
  invoiceDetailForm: FormGroup;
  isEditing: boolean;
  contentVisible: boolean;
  invoiceId: number

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private invoiceDetailService: InvoiceDetailService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.contentVisible = false;
    this.activateRoute.paramMap.subscribe((params) => {
      var id = params.get('id');
      this.invoiceId = parseInt(id)
      this.invoiceDetailForm = this.formBuilder.group({
        idinvoice: id,
        idservice: null,
        quantity: null,
        description: '',
      });
      this.invoiceDetailService.findByIdInvoice(parseInt(id)).then(
        (res) => {
          this.invoiceDetails = res as InvoiceDetail[];
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  addRow() {
    this.contentVisible = !this.contentVisible
    this.invoiceDetailForm = this.formBuilder.group({
      id: null,
      idinvoice: null,
      idservice: null,
      quantity: null,
      description: ""
    });
  }

  addInvoiceDetail() {
    var invoiceDetail: InvoiceDetail = this.invoiceDetailForm
      .value as InvoiceDetail;
    this.invoiceDetailService.create(invoiceDetail).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          console.log(result);
          const newInvoiceDetail = {
            id: result.invoicedetail.id,
            idinvoice: result.invoicedetail.idinvoice,
            idservice: result.invoicedetail.idservice,
            quantity: result.invoicedetail.quantity,
            description: result.invoicedetail.description,
          };
          this.invoiceDetails.unshift(newInvoiceDetail);
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Invoice detail created successful',
            life: 1000,
          });
          this.contentVisible = false;
          this.isEditing = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Invoice detail created failed',
            life: 1000
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Invoice detail created failed',
          life: 1000
        });
      }
    );
  }

  editRow(invoiceDetail: any) {
    this.contentVisible = true;
    this.isEditing = true;
    this.invoiceDetailForm = this.formBuilder.group({
      id: invoiceDetail.id,
      idinvoice: invoiceDetail.idinvoice,
      idservice: invoiceDetail.idservice,
      quantity: invoiceDetail.quantity,
      description: invoiceDetail.description,
    });
  }

  updateInvoiceDetail() {
    var invoiceDetail: InvoiceDetail = this.invoiceDetailForm
      .value as InvoiceDetail;
    this.invoiceDetailService.update(invoiceDetail).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          console.log(result);
          const newInvoiceDetail = {
            id: result.invoicedetail.id,
            idinvoice: result.invoicedetail.idinvoice,
            idservice: result.invoicedetail.idservice,
            quantity: result.invoicedetail.quantity,
            description: result.invoicedetail.description,
          };
          let index = this.invoiceDetails.findIndex(el => el.id == result.invoicedetail.id)
          this.invoiceDetails.splice(index, 1, newInvoiceDetail)

          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Invoice detail created successful',
            life: 1000,
          });
          this.contentVisible = false;
          this.isEditing = false;
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Invoice detail created failed',
            life: 1000
          });
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Invoice detail created failed',
          life: 1000
        });
      }
    );
  }

  cancelEditing() {
    this.contentVisible = false
    this.isEditing = false
  }
}
