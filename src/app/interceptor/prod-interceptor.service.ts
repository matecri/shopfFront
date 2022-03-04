import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtDto } from '../models/jwt-dto';
import { TokenService } from '../services/token.service';
import { catchError, concatMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
const AUTHORIZATION = 'Authorization';
@Injectable({
  providedIn: 'root'
})
export class ProdInterceptorService implements HttpInterceptor {


  constructor(private tokenService: TokenService, private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(req)
    }
    let intReq = req;
    const token = this.tokenService.getToken();
    intReq= this.addToken(req,token);
    if (token != null) {
      intReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) })
    }
    return next.handle(intReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const dto: JwtDto = new JwtDto(this.tokenService.getToken());
        return this.authService.refresh(dto).pipe(concatMap((data: any) => {
          console.log('refreshing....');
          this.tokenService.setToken(data.token);
          intReq = this.addToken(req, data.token);
          return next.handle(intReq);
        }));
      } else {
        if (err.status===400) {
          return throwError(err);
        }else{
          this.tokenService.logOut();
        return throwError(err);
        }
        
      }
    }));
  }
  addToken(req: HttpRequest<any>, token: any): HttpRequest<any> {
    return req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
  }
}
export const interceptorProvider = [{ provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }];

