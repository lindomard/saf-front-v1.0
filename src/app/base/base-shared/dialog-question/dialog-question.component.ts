import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrls: ['./dialog-question.component.scss']
})
export class DialogQuestionComponent implements OnInit {

  @Input() message: string;
  @Input() title: string;

  constructor( 
    public dialogRef: MatDialogRef<DialogQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataDialogQuestion) { 
      this.dialogRef.disableClose = true;
    }

  ngOnInit() {
  }

  onClickOk() {
    this.dialogRef.close(true);
  }

  onClickNot() {
    this.dialogRef.close(false);
  }

}

export interface DataDialogQuestion {
  title: string;
  message: string;
}
