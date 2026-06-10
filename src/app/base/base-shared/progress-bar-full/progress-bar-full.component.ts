import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-progress-bar-full',
  templateUrl: './progress-bar-full.component.html',
  styleUrls: ['./progress-bar-full.component.scss']
})
export class ProgressBarFullComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProgressBarFullComponent>
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

}
