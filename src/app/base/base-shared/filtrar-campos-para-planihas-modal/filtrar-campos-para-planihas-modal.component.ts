import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface CamposRecebidos {
  camposFilters: any;
  title: string;
//
  //FiltrosCamposForm: FormGroup;
}


@Component({
  selector: 'app-filtrar-campos-para-planihas-modal',
  templateUrl: './filtrar-campos-para-planihas-modal.component.html',
  styleUrls: ['./filtrar-campos-para-planihas-modal.component.scss']
})
export class FiltrarCamposParaPlanihasModalComponent implements OnInit {

  @ViewChild('allSelected', { static: true }) private allSelected: MatOption;
  @Output() fBuscarOsDados: EventEmitter<any> = new EventEmitter<any>();
  filtrosCamposForm: UntypedFormGroup;

  @Input() camposFilters: any;

camposRecebidos: CamposRecebidos;

  
  constructor(
     @Inject(MAT_DIALOG_DATA) public dadosRecebidos: any
     , private fb: UntypedFormBuilder
     , public dialogRef: MatDialogRef<FiltrarCamposParaPlanihasModalComponent>


    
  ) { }

  ngOnInit() {
    this.adicionarAoform();
    this.camposRecebidos = this.dadosRecebidos;
  }
  


  adicionarAoform() {

    this.filtrosCamposForm = this.fb.group({
      camposParaPlanilhas: new UntypedFormControl(''),
    });


  }

  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.filtrosCamposForm.controls.camposParaPlanilhas
        .patchValue([...this.camposRecebidos.camposFilters.map(item => item.id), 0]);
    } else {
      this.filtrosCamposForm.controls.camposParaPlanilhas.patchValue([]);
    }
    this.onClickAtualizar();

  }



  onClickAtualizar() {

    this.fBuscarOsDados.emit();

  }
fechar() {
  this.dialogRef.close(this.filtrosCamposForm.get("camposParaPlanilhas").value);
}


}
