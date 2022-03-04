import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Productxsize } from 'src/app/models/productxsize';
import { ProductxSizeService } from 'src/app/services/ProductxSize.service';

@Component({
  selector: 'app-editproductxsize',
  templateUrl: './editproductxsize.component.html',
  styleUrls: ['./editproductxsize.component.css']
})
export class EditproductxsizeComponent implements OnInit {
  errMsj: string | undefined;
  product!:Productxsize;
  update:FormGroup=new FormGroup({
    amount:new FormControl('',Validators.required)
  });
  constructor(private productxsizeservice:ProductxSizeService,
    public dialogRef: MatDialogRef<EditproductxsizeComponent>,
    @Inject(MAT_DIALOG_DATA) public idproduct:number,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
  }
  
  save(){
    this.product = new Productxsize(this.update.get('amount')?.value,this.idproduct,0)
    this.productxsizeservice.update(this.idproduct,this.product).subscribe(
      data => {
        this.toastr.success('Producto Actualizado', 'OK', {
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
}
