import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-config-modal-table',
  templateUrl: './config-table-modal.component.html',
  styleUrls: ['./config-table-modal.component.scss']
})
export class ConfigTableModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any
    ,  public dialogRef: MatDialogRef<ConfigTableModalComponent>,

  ) {this.dialogRef.disableClose = true; }

  ngOnInit(): void {
  }

  Sair() {
    this.dialogRef.close("");

  }

}
