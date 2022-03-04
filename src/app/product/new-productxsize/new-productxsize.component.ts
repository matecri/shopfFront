import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Productxsize } from 'src/app/models/productxsize';
import { ProductxSizeService } from 'src/app/services/ProductxSize.service';
import { SizeService } from 'src/app/services/size.service';

@Component({
  selector: 'app-new-productxsize',
  templateUrl: './new-productxsize.component.html',
  styleUrls: ['./new-productxsize.component.css']
})
export class NewProductxsizeComponent implements OnInit {
  errMsj: string | undefined;
  sizes:  any[]=[];
  product!:Productxsize;
  new:FormGroup=new FormGroup(
    {
      total_amount :new FormControl('',Validators.required),
      size : new FormControl('',Validators.required),
    }
  );
  constructor(private sizeservice:SizeService,
    public dialogRef: MatDialogRef<NewProductxsizeComponent>,
    @Inject(MAT_DIALOG_DATA) public idproduct:number,
    private toastr:ToastrService,
    private productxsizeservice:ProductxSizeService) { }

  ngOnInit(): void {
    this.loadsizes();
  }
  loadsizes(){
    this.sizeservice.list().subscribe(
      data=>{
        this.sizes=data;
      },
      err=>{
        this.toastr.error(err.console.error.mensaje,'fail',{
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
      );
  }
  save(){
    this.product=new Productxsize(this.new.get('total_amount')?.value,this.idproduct,this.new.get('size')?.value);
    this.productxsizeservice.save(this.product).subscribe(
      data => {
        this.dialogRef.close(true);
        this.toastr.success('talla creada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
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
  }
}
