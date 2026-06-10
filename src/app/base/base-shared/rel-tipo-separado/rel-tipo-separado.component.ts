import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TiposDeRelatorios } from '@base-shared/funcoesGerais/tiposDeRelatorios';

@Component({
  selector: 'app-rel-tipo-separado',
  templateUrl: './rel-tipo-separado.component.html',
  styleUrls: ['./rel-tipo-separado.component.scss']
})
export class RelTipoSeparadoComponent implements OnInit {

  @Input() filtrosForm: UntypedFormGroup;
  @Input() camposSeparadoPor: any;
  @Input() tiposDeRelatorios: any;


  constructor() { }

  ngOnInit(): void {
    this.setup();
  }

  setup() {
    this.tiposDeRelatorios = TiposDeRelatorios;
  }

}
