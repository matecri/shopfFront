import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { TokenService } from '../services/token.service';
import { TypeService } from '../services/type.service';
import { DetailProductComponent } from './detail-product.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product!: Product;
  types:any[]=[];
  constructor(private productservice:ProductService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public idproduct:number,
    private tokenservise:TokenService,
    private toastr:ToastrService,
    private typeservice:TypeService,
    private router:Router) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.loadtypes();
  }
  cargarDatos():void{
    this.productservice.detail(this.idproduct).subscribe(
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
  close(){
    this.dialogRef.close();
  }
  edit():void{
    console.log(this.product.mostrar)
    this.productservice.update(this.idproduct,this.product).subscribe(
      data => {
        this.cargarDatos();
        this.toastr.success('Producto Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.dialogRef.close(true);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
          
      }
    );
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
