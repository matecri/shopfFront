import { Component, Inject, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { ProductxSizeService } from '../services/ProductxSize.service';
import { Shoppingcar } from '../models/shoppingcar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShoppingcarService } from '../services/shoppingcar.service';
import { TokenService } from '../services/token.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
const idProductl='idProductl';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  product: Product | undefined;
  errMsj: string | undefined;
  bouth:boolean=false;
  productsizes:  any[]=[];
  sizeSelect:any;
  amount:number =0;
  token:string ="";
  shoppingcar:Shoppingcar | undefined;
  isLogged=false;
  addshoping:FormGroup = new FormGroup(
    {
      amountbuy:new FormControl('',Validators.required),
      productxsizeb: new FormControl('',Validators.required)
    }
  )
  constructor(
    public dialogRef: MatDialogRef<DetailProductComponent>,
    @Inject(MAT_DIALOG_DATA) public idproduct:number,
    private productxsizeservice:ProductxSizeService,
    private prodectservice:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastr:ToastrService,
    private router:Router,
    private Shoppingcars:ShoppingcarService,
    private tokenservise:TokenService
  ) { }

  ngOnInit() {
    this.cargarTallas();
    this.cargarDatos();
    this.isLogged=this.tokenservise.isLogged();
    console.log(this.idproduct);
  }
  cargarTallas():void{
    this.productxsizeservice.list(this.idproduct).subscribe(
      data=>{
        this.productsizes = data;
      },
      err=>{
      this.toastr.error(err.console.error.mensaje,'fail',{
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      this.volver();
    }
    );
  }
  getid(){
    return window.localStorage.getItem(idProductl)!;
  }
  cargarDatos():void{
    this.prodectservice.detail(this.idproduct).subscribe(
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
    
    this.shoppingcar=new Shoppingcar(this.addshoping.get("amountbuy")?.value,false,this.tokenservise.getEmail(),this.sizeSelect.id);
    this.Shoppingcars.add(this.shoppingcar).subscribe(
    data=>{
        this.toastr.success('agregado al carrito','', {
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
  onselectsize(){
    if(this.sizeSelect)
    this.amount=this.sizeSelect.total_amount;
  }
  close(){
    this.dialogRef.close();
  }
}
