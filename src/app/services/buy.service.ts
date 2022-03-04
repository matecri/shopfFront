import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Buy } from '../models/buy';

@Injectable({
  providedIn: 'root'
})
export class BuyService {
  buyUrl=environment.buyUrl;
  constructor(private httpclient:HttpClient) { }
  public buy(buy:Buy):Observable<any>{
    return this.httpclient.post<any>(this.buyUrl+'buy',buy);
  }

}
