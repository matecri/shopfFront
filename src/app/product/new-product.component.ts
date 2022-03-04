import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { TypeService } from '../services/type.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  product:Product | undefined;
  types:any[]=[];
  errMsj: string | undefined;
  NewProduct:FormGroup =new FormGroup(
    {
      img:new FormControl('',Validators.required),
      titulo:new FormControl('',Validators.required),
      descrip:new FormControl('',Validators.required),
      brand:new FormControl('',Validators.required),
      color:new FormControl('',Validators.required),
      mostrar:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      type:new FormControl('',Validators.required)
    }
  )
  constructor(private productservice:ProductService,
    private toastr:ToastrService,
    private typeservice:TypeService,
    public dialogRef: MatDialogRef<NewProductComponent>) { }

  ngOnInit(): void {
    this.loadtypes();
  }
  createProduct():void{
    this.product = new Product(this.NewProduct.get('titulo')?.value,this.NewProduct.get('img')?.value,this.NewProduct.get('descrip')?.value,
    this.NewProduct.get('brand')?.value,this.NewProduct.get('color')?.value,true,
    this.NewProduct.get('price')?.value,this.NewProduct.get('type')?.value);
    this.productservice.save(this.product).subscribe( data => {
      this.toastr.success('Producto Creado', 'OK', {
        timeOut: 3000, positionClass: 'toast-top-center'
      });
      this.dialogRef.close(true);
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
  }
  loadtypes():void{
    this.typeservice.list().subscribe(
      data=>{
        this.types=data;
      },
      err=>{
        console.log(err);
      }
    );
  }

}
