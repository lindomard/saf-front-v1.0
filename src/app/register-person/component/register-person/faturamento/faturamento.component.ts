import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';


export enum TabFaturamentoName {
  TAB_FRETE = 0,
  TAB_COBRANCA_ENTREGA = 1,
  TAB_FINANCEIRO = 2,
  TAB_FISCAL = 3
}
@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.scss']
})
export class FaturamentoComponent implements OnInit {

  selectedTab = new UntypedFormControl(TabFaturamentoName.TAB_FRETE);

  constructor() { }

  ngOnInit() {
  }

  setTab(index: number) {
    this.selectedTab.setValue(index);
  }
}
