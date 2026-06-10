import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-warning',
  templateUrl: './dialog-warning.component.html',
  styleUrls: ['./dialog-warning.component.scss']
})
export class DialogWarningComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogWarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WarningData
  ) { 
    this.dialogRef.disableClose = true;
  }

  onClickOk() {
    this.dialogRef.close();
  }

}

export interface WarningData {
  title: string;
  message: string;
}