import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenCloseResponseI } from '../model/response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  url: string = 'https://api.polygon.io/v1/open-close/crypto/';
  apikey:  string = 'HsXGDm0Acw5MuVVMGHM6T_cArLqN8Yfo';
  apikey2: string = 'BOigQhu1KdTBz4dQbhkgTiJQTIcTq_0p';

  public getOpenCloseBTC(currency: string, date: string) {
    const direction: string  = this.url + "BTC/" + currency + "/"+ date + "?adjusted=true&apiKey=" + this.apikey; 
    return this.httpClient.get<OpenCloseResponseI>(direction)
 
  }
  public getOpenCloseETH(currency: string = "USD", date: string = new Date().toJSON().slice(0,10).replace(/-/g,'-')) {
    const direction: string  = this.url + "ETH/" + currency + "/"+ date + "?adjusted=true&apiKey=" + this.apikey; 
    return this.httpClient.get<OpenCloseResponseI>(direction)
  }
  public getOpenCloseLTC(currency: string = "USD", date: string = new Date().toJSON().slice(0,10).replace(/-/g,'-')) {
    const direction: string  = this.url + "LTC/" + currency + "/"+ date + "?adjusted=true&apiKey=" + this.apikey2; 
    return this.httpClient.get<OpenCloseResponseI>(direction)
  }
  public getOpenCloseDOT(currency: string = "USD", date: string = new Date().toJSON().slice(0,10).replace(/-/g,'-')) {
    const direction: string  = this.url + "DOT/" + currency + "/"+ date + "?adjusted=true&apiKey=" + this.apikey2; 
    return this.httpClient.get<OpenCloseResponseI>(direction)
  }
  public getOpenCloseDOGE(currency: string = "USD", date: string = new Date().toJSON().slice(0,10).replace(/-/g,'-')) {
    const direction: string  = this.url + "DOGE/" + currency + "/"+ date + "?adjusted=true&apiKey=" + this.apikey; 
    return this.httpClient.get<OpenCloseResponseI>(direction)
  }
}
