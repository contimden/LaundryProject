import { Injectable } from "@angular/core";
import { LaundryServices } from "../models/laundryServices.model";
import { BaseURLService } from "./base_URL.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()

export class LaundryServicesService {
  constructor(
    private baseURLService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  async findAll() {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'laundryservice/findall'));
  }
  async findbyid(id: number) {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'laundryservice/findbyid/'+ id));
  }
  async findbyname(name: string) {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'laundryservice/findbyname/'+ name));
  }
  async findbyprice(min: number, max: number) {
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'laundryservice/findbyprice/'+ min + '/'+ max));
  }
  async create(formData: FormData){
    return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl() + 'laundryservice/create', formData));
  }
  async delete(id: number){
    return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl() + 'laundryservice/delete/' + id));
  }
  async update(formData: FormData) {
    return await lastValueFrom(this.httpClient.put(this.baseURLService.getBaseUrl() + 'laundryservice/update', formData));
  }

}