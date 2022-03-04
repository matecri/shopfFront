import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
const TOKEN_KEY='AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles:Array<string>=[];
  constructor(private router:Router) { }
  
  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
    }
   public getEmail(): string{
     if (!this.isLogged()) {
       return "";
     }
     const payload =this.getToken().split('.')[1];
     const payloadDecoude =atob(payload);
     const values = JSON.parse(payloadDecoude);
     const username =values.sub;
    return username;
  }
  public Isadmin(): boolean{
    if (!this.isLogged()) {
      return false;
    }
    const payload =this.getToken().split('.')[1];
    const payloadDecoude =atob(payload);
    const values = JSON.parse(payloadDecoude);
    const roles =values.roles;
    if(roles.indexOf('ROLE_ADMIN') < 0){
      return false;
    }
    return true;
   
 }
  public isLogged():boolean{
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/'])
  }
}
