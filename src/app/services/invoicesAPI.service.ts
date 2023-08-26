import { Injectable } from "@angular/core";
import { Invoices } from "../models/invoices.model";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseurl.service";

@Injectable()

export class InvoicesAPIService {
  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'invoice/findall'));
  }

  async create(invoice: Invoices) {
    return await lastValueFrom(this.httpClient.post(this.baseUrlService.getBaseUrl() + 'invoice/create', invoice));
  }
}