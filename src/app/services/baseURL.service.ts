import { Injectable } from "@angular/core";

@Injectable()

export class BaseURLService {
  private BaseURL: string = "http://localhost:5231/api/"
  getBaseUrl() : string {
    return this.BaseURL
  }
}