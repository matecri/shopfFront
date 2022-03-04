import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Buy } from '../models/buy';
import { Size } from '../models/size';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  sizeUrl=environment.sizeUrl;
  constructor(private httpclient:HttpClient) { }
  public create(size:Size):Observable<any>{
    return this.httpclient.post<any>(this.sizeUrl+'create',size);
  }
  public list(): Observable<Size[]>{
    return this.httpclient.get<Size[]>(this.sizeUrl + 'list');
  }

}