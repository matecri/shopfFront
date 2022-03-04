import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../services/product.service';
import { search } from './searh';
import { PageEvent } from '@angular/material/paginator';
import { TypeService } from '../services/type.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DetailProductComponent } from './detail-product.component';
import { TokenService } from '../services/token.service';
import { EditProductComponent } from './edit-product.component';
import { NewProductComponent } from './new-product.component';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  pageSize = 16;
  i:number = 1;
  desde:number =0;
  hasta:number =16;
  products: any[] =[];
  types:any[]=[];
  typeSelect: any;
  isadmin=false;
  search:search ={
    type:'',
    titulo:'',
    brand:'',
    color:''
  }
  
  constructor(public dialog: MatDialog,private productservice: ProductService,private typeservice:TypeService,private toastr: ToastrService, private tokenservice:TokenService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadtypes();
    this.isadmin=this.tokenservice.Isadmin();
  }
  loadProducts():void{
    if(this.tokenservice.Isadmin()){
      this.productservice.productsadmin(this.search).subscribe(
        data=>{
          this.products=data;
        },
  
      );
    }else{
      this.productservice.products(this.search).subscribe(
        data=>{
          this.products=data;
        },
  
      );
    }
    
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
  changePage(e:PageEvent){
    console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
    console.log(this.desde);
    console.log(this.hasta);
  }
  onChangeType(): void {
    if (this.typeSelect) {
      this.search.type = this.typeSelect.name;
    } else {
      this.search.type = '';
    }
    this.loadProducts();
  }
  
  openDialog(id:number) {
    const dialogRef = this.dialog.open(DetailProductComponent, {
      data:id,
      width: '50%',
    });
    
  }  
  editDialog(id:number) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data:id,
      width: '80%',
    }).afterClosed().subscribe((edit: Boolean)=>{
      if(edit){
        this.loadProducts();
      }
    });
  }
  NewDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '80%',
    }).afterClosed().subscribe((createProduct: Boolean)=>{
      if(createProduct){
        this.loadProducts();
      }
    });
  }
}
