import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';


@Component({
  templateUrl: './listItems.component.html',
  styles: [`
    .p-inputnumber: {
      width: 100%;
    }
  `]
})
export class ListItemsComponent implements OnInit {
  
  itemForm: FormGroup;
  items: Item[]
  item: Item
  contentVisible: boolean
  isEditing: boolean
  file : File
  keyword : string = ''

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private router : Router,
  ) {}

  ngOnInit() {
    this.itemService.findAll().then(
      (res) => {        
        this.items = res as Item[];
      },
      (err) => {
        console.log(err);
      }
    );    
    this.contentVisible = false
  }

  addRow() {
    this.contentVisible = !this.contentVisible
    this.itemForm = this.formBuilder.group({
      name : null,
      quantity: null,
      price: null,
      unit: null,
      description : null,
      photo : null
    });
  }

  selectFile(evt: any) {
    this.file = evt.files[0];
  }
  

  findByKeyword() {
    this.itemService.findByKeyword(this.keyword).then(
      (res) => {        
        this.items = res as Item[];
      },
      (err) => {
        console.log(err);
      }
    );    
    this.contentVisible = false
    }

  editRow(item: Item) {
    console.log(item);
    this.contentVisible = true
    this.isEditing = true
    this.itemForm = this.formBuilder.group({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      unit: item.unit,
      description: item.description,
      photo: item.photo,
    });
  }
  editItem() {
    var item: Item = this.itemForm.value as Item;
    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('strItem', JSON.stringify(item));
    this.itemService.update(formData).then(
      res => {
        var result: any = res as any;
        if (result.status) {
          console.log(result);
          // Cập nhật danh sách items sau khi sửa thành công
          this.itemService.findAll().then(
            updatedItems => {
              this.items = updatedItems as Item[];
              // Hiển thị thông báo thành công
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Item updated',
                life: 1500
              });
              // Đặt lại biểu mẫu và ẩn nội dung
              this.itemForm.reset();
              this.contentVisible = false;
              this.isEditing = false;
            },
            err => {
              console.log(err);
            }
          );
        } else {
          // Xử lý trường hợp thất bại
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Cap nhat San Pham That Bai 1',
          });
        }
      },
      err => {
        // Xử lý lỗi
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Cap nhat San Pham That Bai 2',
        });
      }
    );
  }
    
  addItem() {
    var item: Item = this.itemForm.value as Item;
    var formData = new FormData();
    formData.append('file', this.file);
    formData.append('strItem', JSON.stringify(item));
    this.itemService.create(formData).then(
      res => {
        var result: any = res as any;
        if (result.status) {
          console.log(result);
          this.itemService.findAll().then(
            updatedItems => {
              this.items = updatedItems as Item[];
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Item updated',
                life: 1500
              });
              this.itemForm.reset();
              this.contentVisible = false;
              this.isEditing = false;
            },
            err => {
              console.log(err);
            }
          );
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: 'Failed. Please try again!',
          });
        }
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed',
          detail: 'Failed again. Please try again!',
        });
      }
    );
  }

  // deleteItem(id: number) {
  //   console.log(id);
  //   this.confirmationService.confirm({
  //     message: 'Are you sure?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //         this.itemService.delete(id).then(
  //             res =>{
  //                 var result = res as any;
  //                 if(result.status){
  //                     this.messageService.add({
  //                        severity: 'success',
  //                         detail: 'Done',
  //                     });
  //                     this.itemService.findAll().then(
  //                         res => {
  //                             this.items = res as Item[];
                             
  //                         },
  //                         err => {
  //                             console.log(err);
  //                         }
  //                     );
  //                 }else{
  //                     this.messageService.add({
  //                         severity: 'error',
  //                          detail: 'Failed',
  //                      })
  //                 }
  //             },
  //             err => {
  //                 this.messageService.add({
  //                     severity: 'error',
  //                     summary: 'Failed',
  //                     detail: 'Xoa that bai',
  //                 })
  //             }
  //         )
  //     },
  //     reject: (type) => {                    
  //     }
  // });
  // }

  deleteItem(id : number) {
    console.log(id);
          this.itemService.delete(id).then(
              res =>{
                  var result = res as any;
                  if(result.status){
                      this.messageService.add({
                         severity: 'success',
                          detail: 'Done',
                      });
                      this.itemService.findAll().then(
                          res => {
                              this.items = res as Item[];                           
                          },
                          err => {
                              console.log(err);
                          }
                      );
                  }else{
                      this.messageService.add({
                          severity: 'error',
                           detail: 'Failed',
                       })
                  }
              },
              err => {
                  this.messageService.add({
                      severity: 'error',
                      summary: 'Failed',
                      detail: 'Xoa that bai',
                  })
              }
          )  
  }

  cancelEditing() {
    this.contentVisible = false
    this.isEditing = false
  }
  
}
