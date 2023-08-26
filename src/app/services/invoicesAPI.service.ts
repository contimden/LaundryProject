import { Injectable } from "@angular/core";
import { Invoices } from "../models/invoices.model";
import { BaseURLService } from "./baseURL.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()

export class InvoicesAPIService {
  constructor(
    private baseURLService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'invoice/findall'));
  }

  async create(invoice: Invoices) {
    return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl() + 'invoice/create', invoice));
  }
}