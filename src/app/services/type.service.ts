import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '../models/type';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TypeService {

  productURL=environment.typeURL;
  constructor(private httpCliente: HttpClient) { }
  public list(): Observable<Type[]>{
    return this.httpCliente.get<Type[]>(this.productURL + 'list');
  }
  public detail(id: number): Observable<Type>{
    return this.httpCliente.get<Type>(this.productURL + `detail/${id}`);
  }
  public save(product: Type):Observable<any>{
    return this.httpCliente.post<any>(this.productURL + 'create',product)
  }
  public update(id: number,product: Type):Observable<any>{
    return this.httpCliente.put<any>(this.productURL + `update/${id}`,product)
  }
  public delete(id: number,):Observable<any>{
    return this.httpCliente.delete<any>(this.productURL + `delete/${id}`)
  }
}
 