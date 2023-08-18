import { Injectable } from "@angular/core";
import { LaundryServices } from "../models/laundryServices.model";

@Injectable()

export class LaundryServicesService {
//   find(id: number): Product{
//     var products: Product[] = this.findAll()
//     for(let i = 0; i < products.length; i++) {
//       if(products[i].id == id) return products[i]
//     }
//     return null
//   }

  findAll(): LaundryServices[] {
    return [
      {
        serviceId: 1,
        serviceName: "By weight",
        unit: "kg",
        price: 6,
        description: "$6/kg",
        color: "light"
      },
      {
        serviceId: 2,
        serviceName: "By weight",
        unit: "kg",
        price: 5,
        description: "$5/kg",
        color: "dark"
      },
      {
        serviceId: 3,
        serviceName: "By pieces",
        unit: "pieces",
        price: 2.5,
        description: "$2.5/pieces",
        color: "light"
      },
      {
        serviceId: 4,
        serviceName: "By pieces",
        unit: "pieces",
        price: 2,
        description: "$2/pieces",
        color: "light"
      },
      {
        serviceId: 5,
        serviceName: "By month",
        unit: "kg",
        price: 0,
        description: "Free for 1 month",
        color: "all"
      },
    ];
  }
}