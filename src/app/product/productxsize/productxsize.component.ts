import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductxSizeService } from 'src/app/services/ProductxSize.service';
import { EditproductxsizeComponent } from '../editproductxsize/editproductxsize.component';
import { NewProductxsizeComponent } from '../new-productxsize/new-productxsize.component';

@Component({
  selector: 'app-productxsize',
  templateUrl: './productxsize.component.html',
  styleUrls: ['./productxsize.component.css']
})
export class ProductxsizeComponent implements OnInit {
  product!: Product;
  productsizes:  any[]=[];
  constructor(
    private productservice:ProductService,
    private activatedRoute: ActivatedRoute,
    private toastr:ToastrService,
    private router:Router,
    public dialog: MatDialog,
    private productxsizeservice:ProductxSizeService
  ) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarProductsize();
  }
  cargarDatos():void{
    const id = this.activatedRoute.snapshot.params.idProduct;
    this.productservice.detail(id).subscribe(
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
  cargarProductsize(){
    const id = this.activatedRoute.snapshot.params.idProduct;
    this.productxsizeservice.list(id).subscribe(data=>{
      this.productsizes=data;
    },
    err=>{
      this.toastr.error(err.console.error.mensaje,'fail',{
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      this.volver();
    }
    );
  }
  newSize() {
    const id = this.activatedRoute.snapshot.params.idProduct;
    const dialogRef = this.dialog.open(NewProductxsizeComponent, {
      data:id,
      width: '80%',
    }).afterClosed().subscribe((save: Boolean)=>{
      if(save){
        this.cargarProductsize();
      }
    });
  }
  updatesize(id:number){
    const dialogRef = this.dialog.open(EditproductxsizeComponent, {
      data:id,
      width: '80%',
    }).afterClosed().subscribe((save: Boolean)=>{
      if(save){
        this.cargarProductsize();
      }
    });
  }
}
