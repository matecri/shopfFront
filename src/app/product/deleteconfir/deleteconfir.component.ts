import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteconfir',
  templateUrl: './deleteconfir.component.html',
  styleUrls: ['./deleteconfir.component.css']
})
export class DeleteconfirComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DeleteconfirComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);
    }

  ngOnInit() {
  }


}
