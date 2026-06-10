import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';

@Component({
  selector: 'app-relatorios-planilhas',
  templateUrl: './relatorios-planilhas.component.html',
  styleUrls: ['./relatorios-planilhas.component.scss']
})
export class RelatoriosPlanilhasComponent implements OnInit, OnChanges {

  constructor() { }
  mConfiguracao: string = "Abrir Configurações";
  mAcionadoConfiguracao: boolean = false;

  @Input() dataSourceTableFilpadCab: CadTableFilpadCabModel;
  relatorioSelecionado: DadosParaComboboxModel = {};
  relatoriosSalvos: DadosParaComboboxModel [];

  @Input() mDisableGerar: boolean = false;
  
  @Output() fGerarPdf: EventEmitter<any> = new EventEmitter<any>();
  @Output() fGerarPlanilha: EventEmitter<any> = new EventEmitter<any>();
  @Output() fSalvarRelatorioPadrao: EventEmitter<any> = new EventEmitter<any>();

  @Output() fBuscarCadlRelPad: EventEmitter<any> = new EventEmitter<number>();

  @Output() fConfigurarTable: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetarConfiguracoesEmit: EventEmitter<any> = new EventEmitter<any>();
  

  
  

public formfiltro: FormGroup = new FormGroup({
  nomeRelatorio: new FormControl('', [Validators.required]),
});


  ngOnInit(): void {  }

  
  GerarPdf() {
    this.fGerarPdf.emit();

  }

  GerarPlanilha() {
    this.fGerarPlanilha.emit();

  }

  SalvarRelatorioPadrao() {
    this.fSalvarRelatorioPadrao.emit();

  }

  ConfigurarTable() {
    this.fConfigurarTable.emit();
  }


  clickRelatorioSalvo(selectedItem) {

    this.relatorioSelecionado =this.relatoriosSalvos[selectedItem];

    
    this.fBuscarCadlRelPad.emit(this.relatoriosSalvos[selectedItem].id);
  

  }


  buscarRelatoriosSalvos() {

  }

  // buscar relatoriosSalvos
  
  Configurar() {
    this.mAcionadoConfiguracao = this.mAcionadoConfiguracao==false;
    this.mConfiguracao = this.mAcionadoConfiguracao==false ? "Abrir Configurações": "Fechar Configurações";


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSourceTableFilpadCab'] && this.dataSourceTableFilpadCab.cadTableFilpadCampos) {
      this.relatorioSelecionado = {};

      this.fAtualizarRelatoriosSalvos();
    }
  }
  fAtualizarRelatoriosSalvos() {

    this.relatoriosSalvos = [];

    let dadosParaComboboxModel: DadosParaComboboxModel = {};
    dadosParaComboboxModel.id = 0;
    dadosParaComboboxModel.name = "";
    this.relatoriosSalvos.push(dadosParaComboboxModel);

    this.dataSourceTableFilpadCab.cadrelpadCabResumido.forEach( relatorio=> {
      let dadosParaComboboxModel: DadosParaComboboxModel = {};
      dadosParaComboboxModel.id = relatorio.tfpcId;
      dadosParaComboboxModel.name = relatorio.tfpcNome;
      this.relatoriosSalvos.push(dadosParaComboboxModel);
    } )

  }

  resetarConfiguracoes() {
    console.log('encaminhando o evento 112')
    this.resetarConfiguracoesEmit.emit("");
   }


}
