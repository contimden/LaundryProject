import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { Invoices } from 'src/app/models/invoices.model';
import { LaundryServices } from 'src/app/models/laundryServices.model';
import { InvoicesService } from 'src/app/services/invoices.service';
import { LaundryServicesService } from 'src/app/services/laundryService.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  templateUrl: './laundryServices.component.html',
})
export class LaundryServicesComponent implements OnInit {

  amount = '20.0';
  public showSuccess: boolean;
  public payPalConfig?: IPayPalConfig;
  public showPaypalButtons: boolean;
  serviceForm: FormGroup;
  services: LaundryServices[];
  service: LaundryServices;
  contentVisible: boolean;
  isEditing: boolean;
  serviceId: number;
  file: File;
  editPhoto: string
  type: number
  constructor(
    private laundryService: LaundryServicesService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initConfig();
    const type = localStorage.getItem('type');
    this.type = parseInt(type)
    this.laundryService.findAll().then(
      (res) => {
        this.services = res as LaundryServices[];
        console.log(this.services);
      },
      (err) => {
        console.log(err);
      }
    );
    this.contentVisible = false;
  }

  addRow() {
    this.contentVisible = !this.contentVisible;
    this.serviceForm = this.formBuilder.group({
      servicename: null,
      unit: null,
      price: null,
      description: null,
      photo: null,
    });
  }

  addService() {
    var formData = new FormData();
    var serviceObj: LaundryServices = this.serviceForm.value as LaundryServices;
    console.log(serviceObj);
    formData.append('file', this.file);
    formData.append('strService', JSON.stringify(serviceObj));
    this.laundryService.create(formData).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          this.messageService.add({
            severity: 'success',
            detail: 'Done',
          });
          this.laundryService.findAll().then(
            (res) => {
              this.services = res as LaundryServices[];
              this.contentVisible = false;
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Them that bai',
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateService() {
    var formData = new FormData();
    var serviceObj: LaundryServices = this.serviceForm.value as LaundryServices;
    console.log(serviceObj);
    formData.append('file', this.file);
    formData.append('strLaundryservice', JSON.stringify(serviceObj));
    this.laundryService.update(formData).then(
      (res) => {
        var result: any = res as any;
        if (result.status) {
          this.messageService.add({
            severity: 'success',
            detail: 'Done',
          });
          this.laundryService.findAll().then(
            (res) => {
              this.services = res as LaundryServices[];
              this.contentVisible = false;
            },
            (err) => {
              console.log(err);
            }
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Them that bai',
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
  cancelEditing() {
    this.contentVisible = false;
    this.isEditing = false;
  }

  editRow(service: any) {
    this.contentVisible = true;
    this.isEditing = true;
    this.editPhoto = service.photo
    console.log(service);
    this.serviceForm = this.formBuilder.group({
      id: service.id,
      servicename: service.servicename,
      unit: service.unit,
      price: service.price,
      description: service.description,
      photo: service.photo,
    });
  }

  deleteRow(id: number) {
    this.confirmationService.confirm({
      message: 'Are you sure?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.laundryService.delete(id).then(
          (res) => {
            var result = res as any;
            if (result.status) {
              this.messageService.add({
                severity: 'success',
                detail: 'Done',
              });
              this.laundryService.findAll().then(
                (res) => {
                  this.services = res as LaundryServices[];
                },
                (err) => {
                  console.log(err);
                }
              );
            } else {
              this.messageService.add({
                severity: 'error',
                detail: 'Failed',
              });
            }
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Failed',
              detail: 'Dịch vụ đang được dùng',
            });
          }
        );
      },
      reject: (type) => {},
    });
  }
  
  selectFile(evt: any) {
    this.file = evt.files[0];
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'Ab5n6QXOP4Gonh7SjvjV2IaMIAfV_AqjbowtPrpJeaTLW2O1ML8n_SnL2wh8dBHf7S1sNOq6EaNK9zIV',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.amount.toString(),
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.amount.toString()
              }
            }
          },
          items: [
            {
              name: '1 month',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.amount.toString(),
              },
              description: 'Clean diagram for 1 month',
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      color: 'blue',
      shape: 'rect',
      layout: 'horizontal'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
      return actions.order.capture().then((details) => {
        if(details.status === 'COMPLETED') {
           this.router.navigate(['/services/payment', {transactionId: details.id}]);
          
        }
      })
      
    },
    onClientAuthorization: (data: any) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

}
