import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseUrlService } from "./baseUrl.service";

@Injectable()

export class AccountService {
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

  async findByUsername(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findbyusername/' + keyword));
  }
  async findByType(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findbytype/' + keyword));
  }
  async checkMail(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/checkemail/' + keyword));
  }
  async checkUsername(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/checkemail/' + keyword));
  }
  async create(formData: FormData){
    return await lastValueFrom(this.httpClient.post(this.baseUrlService.getBaseUrl() + 'account/create', formData));
  }
  async verify(){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/verify'));
  }
  async resetPassword(username: string, email: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/resetpassword/' + username +"/" + email));
  }
  async login(username: string, password: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/login/' + username +"&" + password));
  }
  async delete(id: number){
    return await lastValueFrom(this.httpClient.delete(this.baseUrlService.getBaseUrl() + 'account/delete/' + id));
  }
}