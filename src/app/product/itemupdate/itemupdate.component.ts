
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Shoppingcar } from 'src/app/models/shoppingcar';
import { ProductService } from 'src/app/services/product.service';
import { ProductxSizeService } from 'src/app/services/ProductxSize.service';
import { ShoppingcarService } from 'src/app/services/shoppingcar.service';
import { TokenService } from 'src/app/services/token.service';
import { DetailProductComponent } from '../detail-product.component';
const idProductl='idProductl';
@Component({
  selector: 'app-itemupdate',
  templateUrl: './itemupdate.component.html',
  styleUrls: ['./itemupdate.component.css']
})
export class ItemupdateComponent implements OnInit {
  
  product: any | undefined;
  errMsj: string | undefined;
  bouth:boolean=false;
  sizeSelect:any;
  amount:number =0;
  token:string ="";
  shoppingcar:Shoppingcar | undefined;
  isLogged=false;
  addshoping:FormGroup = new FormGroup(
    {
      amountbuy:new FormControl('',Validators.required),
    }
  )
  constructor(
    public dialogRef: MatDialogRef<DetailProductComponent>,
    @Inject(MAT_DIALOG_DATA) public idproduct:number,
    private shoppincarservice:ShoppingcarService,
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router,
    private Shoppingcars:ShoppingcarService,
    private tokenservise:TokenService
  ) { }

  ngOnInit() {
    this.cargarDatos();
    this.isLogged=this.tokenservise.isLogged();
    console.log(this.idproduct);
  }
  getid(){
    return window.localStorage.getItem(idProductl)!;
  }
  cargarDatos():void{
    this.shoppincarservice.detail(this.idproduct).subscribe(
    data=>{
      this.product=data;
    },
    err=>{
      this.toastr.error(err.console.error.mensaje,'fail',{
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      this.volver();
    }
    );
  }
  volver(): void {
    this.router.navigate(['/']);
  }
  onAddcar(){
    this.shoppingcar=new Shoppingcar(this.addshoping.get("amountbuy")?.value,false,this.tokenservise.getEmail(),1);
    this.Shoppingcars.update(this.idproduct,this.shoppingcar).subscribe(
    data=>{
        this.bouth=true;
        this.toastr.success('producto actualizado','', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        
      },
      err => {
        this.errMsj = err.error.message;
        this.toastr.error(this.errMsj, 'error', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        
      }
    );
  }
  close(){
    this.dialogRef.close();
    if(this.bouth){
      window.location.reload();
    }
  }
}
