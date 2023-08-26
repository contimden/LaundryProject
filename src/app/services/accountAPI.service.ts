import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseurl.service";

@Injectable()

export class AccountAPIService {
  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findall'));
  }

  async findById(id: number) {
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findbyid/' + id));
  }

  async update(formData: FormData) {
    return await lastValueFrom(this.httpClient.put(this.baseUrlService.getBaseUrl() + 'account/update', formData));
  }
}