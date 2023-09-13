import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { InvoiceDetail } from 'src/app/models/invoiceDetail.model';
import { Invoices } from 'src/app/models/invoices.model';
import { LaundryServices } from 'src/app/models/laundryServices.model';
import { InvoiceDetailService } from 'src/app/services/invoiceDetail.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { LaundryServicesService } from 'src/app/services/laundryService.service';

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
  invoiceDetail: InvoiceDetail
  invoiceDetails: InvoiceDetail[]
  invoiceDetailForm: FormGroup
  isEditing: boolean
  contentVisible: boolean
  invoiceId: number
  invoice: Invoices
  invoiceForm: FormGroup
  service: LaundryServices
  oldQuantity: number
  oldPrice: number
  laundryService: LaundryServices
  laundryServices: LaundryServices[]
  serviceName: any[]
  type: number

  constructor(
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private invoiceDetailService: InvoiceDetailService,
    private messageService: MessageService,
    private invoicesService: InvoicesService,
    private laundryServicesService: LaundryServicesService,
  ) {}

  ngOnInit() {
    this.contentVisible = false;
    this.activateRoute.paramMap.subscribe((params) => {
      const type = localStorage.getItem('type');
      const id = params.get('id')
      this.type = parseInt(type);
      this.invoiceId = parseInt(id);

      this.laundryServicesService.findAll().then(
        (res) => {
          this.laundryServices = res as LaundryServices[];
          console.log(this.laundryServices);
          
          this.serviceName = this.laundryServices.map(item => {
            return {
              id: item.id,
              servicename: item.servicename + ' by ' + item.unit,
              photo: item.photo,
              unit: item.unit,
              price: item.price,
              description: item.description,
          }
          })

          this.invoiceDetailForm = this.formBuilder.group({
            idinvoice: id,
            idservice: this.laundryServices[0].id,
            quantity: null,
            description: '',
          });
        },
        (err) => {
          console.log(err);
        }
      );
      
      this.invoiceDetailService.findByIdInvoice(parseInt(id)).then(
        (res) => {
          this.invoiceDetails = res as InvoiceDetail[];
          this.invoiceDetails.forEach(item => {
            this.laundryServicesService.findbyid(item.idservice).then(
              (res) => {
                this.laundryService = res as LaundryServices;
                item.name = this.laundryService.servicename
                item.unit = this.laundryService.unit
              },
              (err) => {
                console.log(err);
              }
            );
          })
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  addRow() {
    this.contentVisible = !this.contentVisible
  }

  addInvoiceDetail() {
    var invoiceDetail: InvoiceDetail = this.invoiceDetailForm
      .value as InvoiceDetail;
    console.log(invoiceDetail);
    
    this.invoiceDetailService.create(invoiceDetail).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          console.log(result);
          this.laundryServicesService.findbyid(result.invoicedetail.idservice).then(
            (res) => {
              const data = res as LaundryServices;
              
              const newInvoiceDetail = {
                id: result.invoicedetail.id,
                idinvoice: result.invoicedetail.idinvoice,
                idservice: result.invoicedetail.idservice,
                quantity: result.invoicedetail.quantity,
                description: result.invoicedetail.description,
                name: data.servicename,
                unit: data.unit
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

              this.updateInvoice(newInvoiceDetail.idinvoice, newInvoiceDetail.idservice, newInvoiceDetail.quantity, false)
            },
            (err) => {
              console.log(err);
            }
          );
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
    this.oldQuantity = invoiceDetail.quantity
    this.laundryServicesService.findbyid(invoiceDetail.idservice).then(
      (res) => {
        this.service = res as LaundryServices;
        this.oldPrice = this.service.price
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateInvoiceDetail() {
    var invoiceDetail: InvoiceDetail = this.invoiceDetailForm
      .value as InvoiceDetail;
    this.invoiceDetailService.update(invoiceDetail).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          console.log(result);
          this.laundryServicesService.findbyid(result.invoicedetail.idservice).then(
            (res) => {
              const data = res as LaundryServices;
              
              const newInvoiceDetail = {
                id: result.invoicedetail.id,
                idinvoice: result.invoicedetail.idinvoice,
                idservice: result.invoicedetail.idservice,
                quantity: result.invoicedetail.quantity,
                description: result.invoicedetail.description,
                name: data.servicename,
                unit: data.unit
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

              this.updateInvoice(newInvoiceDetail.idinvoice, newInvoiceDetail.idservice, newInvoiceDetail.quantity, true)
            },
            (err) => {
              console.log(err);
            }
          );
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

  updateInvoice(idInvoice: any, idService: any, quantity: any, isUpdate: boolean) {
    console.log(idInvoice);
    
    this.invoicesService.findById(idInvoice).then(
      (res) => {
        this.invoice = res[0] as Invoices;
        
        this.laundryServicesService.findbyid(idService).then(
          (res) => {
            this.service = res as LaundryServices;
            
            let newTotal = this.invoice.total + this.service.price * quantity
            if(isUpdate) newTotal = newTotal - this.oldPrice * this.oldQuantity
            
            this.invoiceForm = this.formBuilder.group({
              id: this.invoiceId,
              idacc: this.invoice.idacc,
              created: this.invoice.created,
              total: newTotal,
              paid: this.invoice.paid,
              owned: this.invoice.owned,
              expectdate: this.invoice.expectdate,
              completeddate: this.invoice.completeddate,
              description: this.invoice.description,
              status: this.invoice.status,
            });
            
            var invoice: Invoices = this.invoiceForm.value as Invoices;
            console.log(invoice);
            
            this.invoicesService.update(invoice).then(
              (res) => {
                var result: any = res as any;
                if (result.status) {
                  console.log(result);
                  // this.invoices.unshift(result.invoice)
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Failed',
                    detail: 'Add invoice failed',
                    life: 1000
                  });
                }
              },
              (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Failed',
                  detail: 'Add invoice failed',
                  life: 1000
                });
              }
            );
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancelEditing() {
    this.contentVisible = false
    this.isEditing = false
  }
}