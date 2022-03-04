import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Shoppingcar } from "../models/shoppingcar";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class ShoppingcarService{
    productURL=environment.shoppingcarURL;
    constructor(private httpCliente: HttpClient) { }
    public list(id: string): Observable<Shoppingcar[]>{
      return this.httpCliente.get<Shoppingcar[]>(this.productURL + `list/${id}`);
    }
    public add(product: Shoppingcar):Observable<any>{
      return this.httpCliente.post<any>(this.productURL + 'Add',product)
    }
    public update(id: number,product: Shoppingcar):Observable<any>{
      return this.httpCliente.put<any>(this.productURL + `update/${id}`,product)
    }
    public delete(id: number):Observable<any>{
      return this.httpCliente.delete<any>(this.productURL + `remove/${id}`)
    }
    public contador(mail:string):Observable<number>{
      return this.httpCliente.get<number>(this.productURL+ `count/${mail}`)
    }
    public total(mail:string):Observable<number>{
      return this.httpCliente.get<number>(this.productURL+ `total/${mail}`)

    }
    public detail(idProduct: number): Observable<Shoppingcar>{
      return this.httpCliente.get<Shoppingcar>(this.productURL + `detail/${idProduct}`);
    }
  }