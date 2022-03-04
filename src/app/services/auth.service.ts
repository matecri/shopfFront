import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL=environment.authURL;
  constructor(private httpclient:HttpClient) {}
  public register(newuser:NewUser):Observable<any>{
    return this.httpclient.post<any>(this.authURL +'newuser', newuser);
  }
  public login(loginuser:LoginUser):Observable<JwtDto>{
    return this.httpclient.post<JwtDto>(this.authURL +'login', loginuser);
  }
  public refresh(dto:JwtDto):Observable<JwtDto>{
    return this.httpclient.post<JwtDto>(this.authURL +'refresh', dto);
  }
}
