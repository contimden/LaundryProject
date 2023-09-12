import { Injectable } from "@angular/core";
import { Item } from "../models/item.model";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./base_URL.service";

@Injectable()

export class ItemService {
  constructor(
    private baseURLService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'item/findall'));
  }

  async create(itemData: FormData) {
    return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl() + 'item/create', itemData));
  }

  async update(itemData: FormData) {
    return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl() + 'item/update', itemData));
  }

  async delete(id: number) {
    return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl() + 'item/delete/' + id));
  }

  async findByKeyword(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'item/findbyname/' + keyword));
  }

}