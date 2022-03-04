import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShoppingcarService } from '../../services/shoppingcar.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteconfirComponent } from '../deleteconfir/deleteconfir.component';
import { BuyComponent } from '../buy/buy.component';
import { Buy } from 'src/app/models/buy';
import { BuyService } from 'src/app/services/buy.service';
import { ItemupdateComponent } from '../itemupdate/itemupdate.component';
@Component({
  selector: 'app-shoppingcar',
  templateUrl: './shoppingcar.component.html',
  styleUrls: ['./shoppingcar.component.css']
})
export class ShoppingcarComponent implements OnInit {
  total_value:number=0;
  compra:boolean | undefined;
  total:number=0;
  buyinfo: Buy | undefined;
  errMsj: string | undefined;
  constructor(private toastr: ToastrService,private shoppingcarservice:ShoppingcarService,
    private tokenservise:TokenService,private router:Router,public dialogo: MatDialog,private buyservice:BuyService) { }
  pruducts:any[]=[];
  mail:string=this.tokenservise.getEmail();
  ngOnInit(): void {
    this.loadproducts();
    this.loadtotal();
  }
  ngtotal(n1:number,n2:number):number{
    this.total_value=n1*n2;
    return this.total_value;
  }
  borrar(id:number){
    this.dialogo
    .open((DeleteconfirComponent), {
      data: `¿estas seguro de eliminar el producto?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.shoppingcarservice.delete(id).subscribe(
          data => {
            this.toastr.success('Producto Eliminado', 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.loadproducts();
            this.loadtotal();
          },
          err => {
            this.toastr.error(err.error.mensaje, 'Fail', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
          }
        );
      }
    });
  }
  comprar(){
    this.dialogo
    .open((BuyComponent),{
      data:{compra:this.compra,buy:this.buyinfo}
    }
    ).afterClosed();
  }
  loadproducts(){
    this.shoppingcarservice.list(this.mail).subscribe(
      data=>{
        this.pruducts=data;
      },
    );
  }
  openDialog(id:number) {
    const dialogRef = this.dialogo.open(ItemupdateComponent, {
      data:id,
      width: '50%',
    });

  }
  loadtotal(){
    this.shoppingcarservice.total(this.mail).subscribe(
      data=>{
        this.total=data;
      }
    );
  }
}
