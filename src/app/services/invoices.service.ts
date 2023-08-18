import { Injectable } from "@angular/core";
import { Invoices } from "../models/invoices.model";

@Injectable()

export class InvoicesService {
//   find(id: number): Product{
//     var products: Product[] = this.findAll()
//     for(let i = 0; i < products.length; i++) {
//       if(products[i].id == id) return products[i]
//     }
//     return null
//   }

  findAll(): Invoices[] {
    return [
      {
        invoiceId: 1,
        idAcc: 1,
        created: "2023-01-01",
        total: 10,
        paid: 7,
        owned: 3,
        expectedDate: "2023-01-02",
        completedDate: "2023-01-03",
        description: "invoice 1",
        deliveryStatus: 1,
        paidStatus: 1,
        serviceId: 1,
        color: "dark",
        unit: "kg",
        quantity: 4
      },
      {
        invoiceId: 2,
        idAcc: 1,
        created: "2023-01-01",
        total: 10,
        paid: 7,
        owned: 3,
        expectedDate: "2023-01-02",
        completedDate: "2023-01-03",
        description: "invoice 2",
        deliveryStatus: 2,
        paidStatus: 2,
        serviceId: 1,
        color: "light",
        unit: "kg",
        quantity: 5
      },
      {
        invoiceId: 3,
        idAcc: 1,
        created: "2023-01-01",
        total: 10,
        paid: 7,
        owned: 3,
        expectedDate: "2023-01-02",
        completedDate: "2023-01-03",
        description: "invoice 3",
        deliveryStatus: 3,
        paidStatus: 1,
        serviceId: 2,
        color: "dark",
        unit: "pieces",
        quantity: 5
      }
    ];
  }

  find(id: number): Invoices {
    var invoices: Invoices[] = this.findAll();
    for (var i = 0; i < invoices.length; i++) {
        if (invoices[i].invoiceId == id) {
            return invoices[i];
        }
    }
    return null;
  }
}