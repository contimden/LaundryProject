import { Injectable } from "@angular/core";
import { ItemImport } from "../models/itemImport.model";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./base_URL.service";

@Injectable()

export class ItemImportService {
  constructor(
    private baseURLService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'importitem/findall'));
  }

  async create(itemData: ItemImport) {
    return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl() + 'importitem/create', itemData));
  }

  async update(itemData: FormData) {
    return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl() + 'importitem/update', itemData));
  }

  async delete(id: number) {
    return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl() + 'importitem/delete/' + id));
  }


}