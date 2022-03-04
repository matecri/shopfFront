import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { NewUser } from '../models/new-user';
import { Register } from './register';
import { LoginUser } from '../models/login-user';
import { variable } from '@angular/compiler/src/output/output_ast'; 
import { ErrorStateMatcher } from '@angular/material/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  passequals=true;

  isLoginFail = false;
  errMsj: string | undefined;
  registeruser :NewUser | undefined;
  loginUser: LoginUser | undefined;
  roles: string[] = [];
  submitted = false;
  register:FormGroup=new FormGroup(
    {
      name :new FormControl('',Validators.required),
      lastname :new FormControl('',Validators.required),
      email :new FormControl('',[Validators.required,Validators.email]),
      password : new FormControl('',[Validators.required,Validators.pattern('')]),
      repeatpassword : new FormControl('',[Validators.required]),
      address : new FormControl('',Validators.required),
      document: new FormControl('',Validators.required),
      typedocument: new FormControl('',Validators.required) 
      
    } 
  );
  
  constructor(
    private tokenservice: TokenService,
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  ngOnInit(): void {
  }
  get f() { return this.register.controls; }
  onRegister(){
    this.submitted=true;
    if(this.register.invalid){
      return;
    }
    if(!(this.register.get('password')?.value === this.register.get('repeatpassword')?.value)){
      this.passequals=false;
      return;
    }
    this.passequals=true;
    this.registeruser=new NewUser(this.register.get('name')?.value,this.register.get('lastname')?.value,
    this.register.get('email')?.value,this.register.get('password')?.value,this.register.get('address')?.value,
    this.register.get('document')?.value, this.register.get('typedocument')?.value);
    this.authservice.register(this.registeruser).subscribe(
      data=>{
        this.loginUser = new LoginUser(this.register.get('email')?.value,this.register.get('password')?.value);
    this.authservice.login(this.loginUser).subscribe(
      data => {
        this.isLoginFail = false;
        this.tokenservice.setToken(data.token);
        this.toastr.success('Bienvenido ','', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      },
      err => {
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
      },
      err => {
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

}
