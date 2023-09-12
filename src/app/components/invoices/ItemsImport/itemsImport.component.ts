import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ItemImport } from 'src/app/models/itemImport.model';
import { ItemImportService } from 'src/app/services/itemsImport.service';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';

@Component({
  templateUrl: './itemImport.component.html',
  styles: [`
    .p-inputnumber: {
      width: 100%;
    }
  `]
})
export class ItemImportComponent implements OnInit {
  
  itemImportForm: FormGroup;
  itemsImports: ItemImport[]
  itemsImport: ItemImport
  items: Item[]
  item: Item
  contentVisible: boolean
  isEditing: boolean
  file : File
  keyword : string = ''

  constructor(
    private formBuilder: FormBuilder,
    private itemImportService: ItemImportService,
    private messageService: MessageService,
    public datepipe: DatePipe,
    private itemService: ItemService,
    private router : Router
  ) {}

  ngOnInit() {
    this.itemImportService.findAll().then(
      (res) => {        
        this.itemsImports = res as ItemImport[];
      },
      (err) => {
        console.log(err);
      }
    );    this.contentVisible = false
  }

  addRow() {
    this.contentVisible = !this.contentVisible
    this.itemImportForm = this.formBuilder.group({
      idItem: null,
      quantity : null,
      description: null,
      price: null,
      entryDate: new Date()
    });
  }

  save() {
    // Thực hiện việc gửi dữ liệu ở đây
  }

  editRow(itemsImport: ItemImport) {
    console.log(itemsImport);
    itemsImport.entryDate = this.datepipe.transform(itemsImport.entryDate, 'dd/MM/yyyy')
    this.contentVisible = true
    this.isEditing = true
    this.itemImportForm = this.formBuilder.group({
      id : itemsImport.id,
      idItem : itemsImport.idItem,
      quantity: itemsImport.quantity,
      description: itemsImport.description,
      price: itemsImport.price,
      entryDate: itemsImport.entryDate,
    });
  }

  addItem() {
    var itemImp : ItemImport = this.itemImportForm.value as ItemImport;
    console.log(itemImp);
    this.itemImportService.create(itemImp).then(
      res => {
          var result: any = res as any;
          if (result.status) {
              console.log(result);
              // Làm mới danh sách sau khi thêm mục thành công
              this.itemImportService.findAll().then(
                  updatedItems => {
                      this.itemsImports = updatedItems as ItemImport[];
                  },
                  err => {
                      console.log(err);
                  }
              );
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

  selectFile(evt: any) {
    this.file = evt.files[0];
  }

  cancelEditing() {
    this.contentVisible = false
    this.isEditing = false
  }

  deleteItem(id : number) {
    console.log(id);
          this.itemImportService.delete(id).then(
              res =>{
                  var result = res as any;
                  if(result.status){
                      this.messageService.add({
                         severity: 'success',
                          detail: 'Done',
                      });
                      this.itemImportService.findAll().then(
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
  
}
