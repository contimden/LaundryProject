import { Injectable } from "@angular/core";
import { Account } from "../models/account.model";
import { BaseURLService } from "./baseURL.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()

export class AccountAPIService {
  constructor(
    private baseURLService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/findall'));
  }

  async findById(id: number) {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/findbyid/' + id));
  }

  async update(formData: FormData) {
    return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl() + 'account/update', formData));
  }
}