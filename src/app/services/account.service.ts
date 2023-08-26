import { Injectable } from "@angular/core";
import { Account } from "../models/account.model";
import { BaseUrlService } from "./baseurl.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()

export class AccountService {
  constructor(
    private baseUrlService: BaseUrlService,
    private httpClient: HttpClient
){}
  async findall(){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findall'));
  }
  async findbyid(keyword: number){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findbyid/' + keyword));
  }
  async findbyusername(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findbyusername/' + keyword));
  }
  async findbytype(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/findbytype/' + keyword));
  }
  async checkmail(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/checkemail/' + keyword));
  }
  async checkusername(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/checkemail/' + keyword));
  }
  async create(formData: FormData){
    return await lastValueFrom(this.httpClient.post(this.baseUrlService.getBaseUrl() + 'account/create', formData));
  }
  async verify(){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/verify'));
  }
  async resetpassword(username: string, email: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/resetpassword/' + username +"/" + email));
  }
  async login(username: string, password: string){
    return await lastValueFrom(this.httpClient.get(this.baseUrlService.getBaseUrl() + 'account/login/' + username +"&" + password));
  }
  async delete(id: number){
    return await lastValueFrom(this.httpClient.delete(this.baseUrlService.getBaseUrl() + 'account/delete/' + id));
  }
  async update(formData: FormData){
    return await lastValueFrom(this.httpClient.put(this.baseUrlService.getBaseUrl() + 'account/update', formData));
  }
}