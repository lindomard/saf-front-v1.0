import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-saltar-relatorio-padrao-modal',
  templateUrl: './saltar-relatorio-padrao-modal.component.html',
  styleUrls: ['./saltar-relatorio-padrao-modal.component.scss']
})
export class SaltarRelatorioPadraoModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any
    ,  public dialogRef: MatDialogRef<SaltarRelatorioPadraoModalComponent>,

  ) {this.dialogRef.disableClose = true; }

  mDisableGerar: false;

  form_salvar: FormGroup = new FormGroup({
    nomeRelatorio: new FormControl('', [Validators.required, Validators.maxLength(100)]),
});



  ngOnInit(): void {
  }

  salvar() {

    this.dialogRef.close(this.form_salvar.get("nomeRelatorio").value);


  }

  Sair() {
    this.dialogRef.close("");

  }
}
