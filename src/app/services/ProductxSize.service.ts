import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productxsize } from '../models/productxsize';
import { environment } from '../../environments/environment';



@Injectable({
    providedIn: 'root'
  })
  export class ProductxSizeService {
    productURL=environment.productxsizeURL;
    constructor(private httpCliente: HttpClient) { }
    public list(id: number): Observable<Productxsize[]>{
      return this.httpCliente.get<Productxsize[]>(this.productURL + `list/${id}`);
    }
    public save(product: Productxsize):Observable<any>{
      return this.httpCliente.post<any>(this.productURL + 'create',product)
    }
    public update(id: number,product: Productxsize):Observable<any>{
      return this.httpCliente.put<any>(this.productURL + `update/${id}`,product)
    }
    public delete(id: number,):Observable<any>{
      return this.httpCliente.delete<any>(this.productURL + `delete/${id}`)
    }
  }
