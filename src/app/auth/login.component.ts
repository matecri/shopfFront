import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from '../models/login-user';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { Login } from './login';
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUser: LoginUser | undefined;
  roles: string[] = [];
  errMsj: string | undefined;
  Login:FormGroup=new FormGroup(
    {
      email :new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',Validators.required)
    }
  );
  constructor(
    private tokenservice: TokenService,
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit() {
    
  }
  onLogin() {
    this.loginUser = new LoginUser(this.Login.get('email')?.value, this.Login.get('password')?.value);
    this.authservice.login(this.loginUser).subscribe(
      data => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenservice.setToken(data.token);
        this.toastr.success('Bienvenido ','', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }
  
}
