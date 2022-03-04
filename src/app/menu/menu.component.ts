import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../services/token.service';
import { ShoppingcarService } from '../services/shoppingcar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  contador:any=0;
  isLogged=false;
  constructor(private shopservice:ShoppingcarService,public dialog: MatDialog,private tokenservise:TokenService,private toastr: ToastrService){}
  title = 'shopfront';
  ngOnInit():void{
    this.isLogged=this.tokenservise.isLogged();
    this.loadcount();
  }
  onLogOut(): void{
    this.tokenservise.logOut();
    window.location.reload();
    this.toastr.success('Hasta luego','', {
      timeOut: 3000, positionClass: 'toast-top-center',
    });
  }
  loadcount(){
    if(this.tokenservise.isLogged()){
      this.shopservice.contador(this.tokenservise.getEmail()).subscribe(
        data=>
          this.contador=data
      );
    }
    
  }
}
