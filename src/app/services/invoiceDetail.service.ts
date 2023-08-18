import { Injectable } from "@angular/core";
import { InvoiceDetail } from "../models/invoiceDetail.model";

@Injectable()

export class InvoiceDetailService {
//   find(id: number): Product{
//     var products: Product[] = this.findAll()
//     for(let i = 0; i < products.length; i++) {
//       if(products[i].id == id) return products[i]
//     }
//     return null
//   }

  findAll(): InvoiceDetail[] {
    return [
      {
        invoiceId: 1,
        serviceId: 1,
        quantity: 10,
        description: "ao thun"
      },
      {
        invoiceId: 2,
        serviceId: 2,
        quantity: 10,
        description: "ao so mi"
      },
      {
        invoiceId: 3,
        serviceId: 1,
        quantity: 10,
        description: "quan tay"
      },
    ];
  }
}