import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

export enum TabObservacaoName {
  TAB_GERAL = 0,
  TAB_PEDIDO = 1,
  TAB_NFE = 2,
}

@Component({
  selector: 'app-observacao',
  templateUrl: './observacao.component.html',
  styleUrls: ['./observacao.component.scss']
})
export class ObservacaoComponent implements OnInit {

  selectedTab = new UntypedFormControl(TabObservacaoName.TAB_GERAL);
  
  constructor() { }

  ngOnInit() {
  }

  setTab(index: number) {
    this.selectedTab.setValue(index);
  }
}
