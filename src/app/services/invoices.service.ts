import { Injectable } from "@angular/core";
import { Invoices } from "../models/invoices.model";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./base_URL.service";

@Injectable()

export class InvoicesService {
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