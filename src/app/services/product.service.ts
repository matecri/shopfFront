import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { search } from '../product/searh';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productURL=environment.productURL;
  constructor(private httpClient: HttpClient) { }
  products(search:search):Observable<any[]>{
    return this.httpClient.post<any>(this.productURL+'list',search);
  }
  productsadmin(search:search):Observable<any[]>{
    return this.httpClient.post<any>(this.productURL+'adminlist',search);
  }
  public detail(idProduct: number): Observable<Product>{
    return this.httpClient.get<Product>(this.productURL + `detail/${idProduct}`);
  }
  public save(product: Product):Observable<any>{
    return this.httpClient.post<any>(this.productURL + 'create',product);
  }
  public update(idProduct: number,product: Product):Observable<any>{
    return this.httpClient.put<any>(this.productURL + `update/${idProduct}`,product);
  }
  public delete(idProduct: number):Observable<any>{
    return this.httpClient.delete<any>(this.productURL + `delete/${idProduct}`);
  }
  public popular():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.productURL+'popular');
  }
}
