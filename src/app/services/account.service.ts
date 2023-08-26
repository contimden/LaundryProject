import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { BaseURLService } from "./base_URL.service";

@Injectable()

export class AccountService {
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

  async findByUsername(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/findbyusername/' + keyword));
  }
  async findByType(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/findbytype/' + keyword));
  }
  async checkMail(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/checkemail/' + keyword));
  }
  async checkUsername(keyword: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/checkemail/' + keyword));
  }
  async create(formData: FormData){
    return await lastValueFrom(this.httpClient.post(this.baseURLService.getBaseUrl() + 'account/create', formData));
  }
  async verify(){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/verify'));
  }
  async resetPassword(username: string, email: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/resetpassword/' + username +"/" + email));
  }
  async login(username: string, password: string){
    return await lastValueFrom(this.httpClient.get(this.baseURLService.getBaseUrl() + 'account/login/' + username +"&" + password));
  }
  async delete(id: number){
    return await lastValueFrom(this.httpClient.delete(this.baseURLService.getBaseUrl() + 'account/delete/' + id));
  }
}