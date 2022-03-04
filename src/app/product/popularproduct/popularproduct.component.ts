import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import { DetailProductComponent } from '../detail-product.component';
const idProduct='idProductl';
@Component({
  selector: 'app-popularproduct',
  templateUrl: './popularproduct.component.html',
  styleUrls: ['./popularproduct.component.css']
})
export class PopularproductComponent implements OnInit {

  constructor(public dialog: MatDialog,private productservice: ProductService) { }
  products: any[] =[];
  ngOnInit(): void {
    this.productservice.popular().subscribe(
      data=>{
        this.products=data;
      }
    );
  }
  openDialog(id:number) {
    const dialogRef = this.dialog.open(DetailProductComponent, {
      data:id,
      width: '50%',
    });

  }  

}
