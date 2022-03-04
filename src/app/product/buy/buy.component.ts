import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Buy } from 'src/app/models/buy';
import { BuyService } from 'src/app/services/buy.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  buy:Buy | undefined;
  compra:boolean=false;
  errMsj: string | undefined;
  buyform:FormGroup=new FormGroup(
    {
      address :new FormControl('',Validators.required),
      city : new FormControl('',Validators.required),
      Cpostal  : new FormControl('',Validators.required),
      phonenumber: new FormControl('',Validators.required),
    }
  );
  constructor( public dialogRef: MatDialogRef<BuyComponent>,private tokenservice:TokenService, private buyservice:BuyService,private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
  }
  onsave(){
    this.compra=true;
    this.buy =new Buy(this.buyform.get('address')?.value,this.buyform.get('city')?.value,this.buyform.get('Cpostal')?.value,this.buyform.get('phonenumber')?.value,this.tokenservice.getEmail());
    this.dialogRef.close();
    this.buyservice.buy(this.buy).subscribe(
      data=>{
        this.toastr.success('Compra realizada ','', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      },
      err => {
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'error', {
          timeOut: 5000, positionClass: 'toast-top-center',
        });
        window.location.reload();
      }
    );
  }
  cerrarDialogo(): void {
    this.dialogRef.close();
  }

}
