import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { OrdemCamposComponent } from '../ordem-campos/ordem-campos.component';
import { PesquisarPorComponent } from '../pesquisar-por/pesquisar-por.component';
import { getCondicoesTodasArray, getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { SnotifyService } from 'ng-snotify';
//import { ConfigRelatorioComponent } from '../config-relatorio/config-relatorio.component';

@Component({
  selector: 'app-consultas-e-relatorios',
  templateUrl: './consultas-e-relatorios.component.html',
  styleUrls: ['./consultas-e-relatorios.component.scss']
})
export class ConsultasERelatoriosComponent implements OnInit {


//  @ViewChild('instanceFiltrosCampos', { static: true }) instanceFiltrosCampos: FiltrosCamposComponent;
  @ViewChild('instanceOrdemCampos', { static: true }) instanceOrdemCampos!: OrdemCamposComponent;
//  @ViewChild('instanceConfigRelatorio', { static: true }) instanceConfigRelatorio: ConfigRelatorioComponent;
  @ViewChild('instancePesquisarPor', { static: true }) instancePesquisarPor!: PesquisarPorComponent;
/*
  @Input() dataSourceCadTableFidlpadCamposFiltrosExtras: any;
  @Input() dataSourceTableFilpadCampos: any;
  @Input() dataSourceTableFilpadOrdemResult: any;
*/


telaCheia: boolean = true;
@Input() dataSourceTableFilpadCab: any;

  
  @Input() dataSourcecamposParaFiltrosList: any;

  
  @Input() camposConsultaPor = [];
  @Input() dataSourceFiltros:  any;

  

  

  @Input() camposParaFieldsFilter = [];
  @Input() dataSourceFilpadRelCampos:  any;
  @Input() dataSourceFilpadRelOrdemResult:  any;
  
  @Input() mDisableGerar: boolean = false;



  @Output() fAtualizaAtualizarPor: EventEmitter<any> = new EventEmitter<any>();
  @Output() fAjustarDisplayColumnsTableEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() fAtualizarDadosTabelaFiltros: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetarConfiguracoesEmit: EventEmitter<any> = new EventEmitter<any>();
            

  @Output() fGerarPdf: EventEmitter<any> = new EventEmitter<any>();
  @Output() fGerarPlanilha: EventEmitter<any> = new EventEmitter<any>();
  @Output() fSalvarRelatorioPadrao: EventEmitter<any> = new EventEmitter<any>();

  @Output() fBuscarCadlRelPad: EventEmitter<any> = new EventEmitter<number>();

  @Output() fConfigurarTable: EventEmitter<any> = new EventEmitter<any>();

  condicaoString = getCondicoesTodasArray();
  tipoRelacionarCondicao = getRelacionarCondicao();

  constructor(private cd: ChangeDetectorRef
    , private snotifyService: SnotifyService) { }


  ngOnInit(): void {
  }


  fAtualizarBusca() {

    this.fAtualizarDadosTabelaFiltros.emit();

  }

  fAtualizarBusca2(event) {

//  console.log('ao sair ', JSON.stringify(event));
    this.fAtualizaAtualizarPor.emit(event);
  }
 fAjustarDisplayColumnsTable(event) {

      

  this.fAjustarDisplayColumnsTableEmit.emit(event);
  // console.log('emitindo do consulta -e relatorios ')
  

 }

  baixarRelatorio() {
    this.fGerarPdf.emit();
  }


  fBuscarPlanilha() {
    this.fGerarPlanilha.emit()
  }




  fSalvarRelatorioPadraoDialog() {
    this.fSalvarRelatorioPadrao.emit();
  }

  fBuscarCadlRelPadChama($event) {

  this.fBuscarCadlRelPad.emit($event);
  }

  

  atualizarFiltrosCampos() {

 
     this.instancePesquisarPor.camposConsultaPor = this.camposConsultaPor;
     this.instancePesquisarPor.formfiltro.get('nomeDoCampo').setValue((this.camposConsultaPor.length > 0 ?
       this.camposConsultaPor[0].tfpcNomeCampo : null));
     this.instancePesquisarPor.clickcamposConsultaPor(0);
     this.instancePesquisarPor.formfiltro.get('condicao').setValue(this.instancePesquisarPor.condicoesDosCampos[0].tfpcNomeCampo);
     this.instancePesquisarPor.formfiltro.get('valor').setValue('');
 
 
 
 /*
     this.instanceFiltrosCampos.camposConsultaPor = this.camposConsultaPor;
     this.instanceFiltrosCampos.formfiltro.get('relacionarCondicao').setValue(this.tipoRelacionarCondicao[0].id);
     this.instanceFiltrosCampos.formfiltro.get('nomeDoCampo').setValue((this.camposConsultaPor.length > 0 ? this.camposConsultaPor[0].tfpcId : null));
     this.instanceFiltrosCampos.clickCamposDaTabela(0);
     this.instanceFiltrosCampos.formfiltro.get('condicao').setValue(this.instanceFiltrosCampos.condicoesDosCampos[0].tfpcId);
     this.instanceFiltrosCampos.formfiltro.get('condicao').setValue(this.instanceFiltrosCampos.condicoesDosCampos[0].tfpcId);
     this.instanceFiltrosCampos.formfiltro.get('valor').setValue('');
 
     if (this.instanceFiltrosCampos.formfiltro.get('grupoFiltro').value < 1) {
       this.instanceFiltrosCampos.formfiltro.get('grupoFiltro').setValue(1);
     }
 
     console.log('noem do campo ',this.instanceFiltrosCampos.formfiltro.get('nomeDoCampo').value)
 
     this.instanceFiltrosCampos.dataSourceFiltros = this.dataSourceFiltros;
     this.snotifyService.warning("ja no consulta e relaotiros ", JSON.stringify(this.dataSourceFiltros.data) );
     console.log("ja no consulta e relaotiros " + JSON.stringify(this.dataSourceFiltros.data) )
     
     */
     //this.instanceFiltrosCampos.fLimparCampos();
     this.instancePesquisarPor.valorInicial();

     this.cd.detectChanges();
 
 
   }

   mudarDiv() {
    console.log('tela cheia ', this.telaCheia)
   } 
   fTelaCheia(telaCheia: any) {
    console.log("tela cheia no evento", telaCheia)
    this.telaCheia= telaCheia;

   }
   resetarConfiguracoes() {
    this.resetarConfiguracoesEmit.emit("");
   }
}
