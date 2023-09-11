import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./base_URL.service";
import { InvoiceDetail } from "../models/invoiceDetail.model";

@Injectable()

export class InvoiceDetailService {
  constructor(
    private baseURLService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  async findByIdInvoice(idinvoice: number) {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'invoicedetails/findbyidinvoice/' + idinvoice));
  }

  async findByIdService(idinvoice: number) {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'invoicedetails/findbyidservice/' + idinvoice));
  }

  async create(invoiceDetail: InvoiceDetail) {
    return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl() + 'invoicedetails/create', invoiceDetail));
  }

  async update(invoiceDetail: InvoiceDetail) {
    return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl() + 'invoicedetails/update', invoiceDetail));
  }

  async delete(id: number) {
    return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl() + 'invoicedetails/delete/' + id));
  }
}