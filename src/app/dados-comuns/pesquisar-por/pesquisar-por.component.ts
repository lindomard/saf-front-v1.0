import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getCondicoesNumeroDataArray, getCondicoesStringArray, getCondicoesTodasArray, getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { CamposParaFiltros } from '../model/CamposParaFiltros';
import { getFormValidationErrors } from '@base-core/function/validar-forms';
import { SnotifyService } from 'ng-snotify';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { tryCatch } from 'rxjs/internal-compatibility';
import { MatTableDataSource } from '@angular/material/table';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { DadosComunsService } from '../dados-comuns.service';
import { safeCall } from '@base-core/safe-call';
@Component({
  selector: 'app-pesquisar-por',
  templateUrl: './pesquisar-por.component.html',
  styleUrls: ['./pesquisar-por.component.scss']
})
export class PesquisarPorComponent implements OnInit, OnChanges {

  //@Input() camposConsultaPor_ant = [];


  /*
  
    @Input() dataSourceCadTableFidlpadCamposFiltrosExtras: any;
    @Input() dataSourceTableFilpadCampos: any;
    @Input() dataSourceTableFilpadOrdemResult: any;
  
    */

  isLoading = false;
  telaCheia: boolean = true;
  mAlterouTable: boolean = false;
  mAlterouRelatorio: boolean = false;

  @Input() dataSourcecamposParaFiltrosList = new MatTableDataSource<CamposParaFiltros>([]);



  // @Input() dataSourceTableFilpadCab = new MatTableDataSource<CadTableFilpadCabModel>();

  camposConsultaPor: CadTableFilpadCamposModel[] = [];


  @Input() dataSourceTableFilpadCab: CadTableFilpadCabModel = {};



  //@Input() fAjustarDisplayColumnsTableEmit: any;
  @Output() fAjustarDisplayColumnsTableEmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() fTelacheiaEmit: EventEmitter<any> = new EventEmitter<any>();


  //  (fAjustarDisplayColumnsTable)="fAjustarDisplayColumnsTable($event)"

  @Output() fAtualizaAtualizarPor: EventEmitter<any> = new EventEmitter<any>();
  //  @Output() fMaisFiltros: EventEmitter<any> = new EventEmitter<any>();
  //  @Output() fConfigTabela: EventEmitter<any> = new EventEmitter<any>();
  //  @Output() fConfigRelatorio: EventEmitter<any> = new EventEmitter<any>();


  maisFiltros: string = "Mais Filtros";
  maisFiltrosVisivel: boolean = false;
  mRelatorio: string = "Mostrar Menu Relatorio";

  configurarTabela: string = "Mostrar Config Tabela";
  configurarTabelaVisivel: boolean = false;

  type: String = 'number';

  resumoFiltros: String = "";
  @ViewChild('valor') valor: ElementRef;


  campoParaFiltro: CamposParaFiltros = {};

  constructor(private snotifyService: SnotifyService
    , private dadosComunsService: DadosComunsService

  ) { }

  public condicoesDosCampos = [];
  public condicoesDosCamposGeral = [];
  public mRelacionarCondicao = [];



  public formfiltro: FormGroup = new FormGroup({
    nomeDoCampo: new FormControl('', [Validators.required]),
    condicao: new FormControl('', [Validators.required]),
    valor: new FormControl('', []),
  });


  ngOnInit(): void {
    this.preeecherCampos();
    this.ativarLeitura();



  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSourceTableFilpadCab'] && this.dataSourceTableFilpadCab.cadTableFilpadCampos) {
      this.fAtualizarCamposConsultaPor();
    }
  }
  fAtualizarCamposConsultaPor() {
    this.camposConsultaPor = this.dataSourceTableFilpadCab.cadTableFilpadCampos.filter(it =>
      it.tfpcOrdemPesqpor > 0
    )
    this.camposConsultaPor.sort((a, b) => a.tfpcOrdemPesqpor - b.tfpcOrdemPesqpor);

    if (this.camposConsultaPor.length > 0) {
      this.formfiltro.get("nomeDoCampo").setValue(this.camposConsultaPor[0].tfpcNomeCampo);
      this.formfiltro.get("condicao").setValue(this.condicoesDosCampos[0].id);
      //this.clickcamposConsultaPor(0);
    }

  }



  ativarLeitura() {
    this.formfiltro.get("valor").valueChanges.pipe(debounceTime(1000)).subscribe(data => {
      this.atualizar();
    });
  }

  preeecherCampos() {

    this.condicoesDosCampos = getCondicoesNumeroDataArray();
    this.condicoesDosCamposGeral = getCondicoesTodasArray();
    this.mRelacionarCondicao = getRelacionarCondicao();



  }


  clickcamposConsultaPor(event) {
    if (this.camposConsultaPor.length > 0) {
      this.type = this.camposConsultaPor[event].tfpcTipoCampo;
      if (this.type === "date" || this.type === "datetime-local" || this.type === "number") {
        this.condicoesDosCampos = getCondicoesNumeroDataArray();
      } else {
        this.condicoesDosCampos = getCondicoesStringArray();
      }


    }
  }

  public valorInicial() {

    try {



      //      console.log('no valor inicial o json ', JSON.stringify(this.camposConsultaPor))

      //      console.log('valor inicial ', this.camposConsultaPor[0].tfpcNomeCampo)

      this.formfiltro.get('nomeDoCampo').setValue((this.camposConsultaPor.length > 0 ? this.camposConsultaPor[0].tfpcNomeCampo : null));
      this.clickcamposConsultaPor(0);
      this.formfiltro.get('condicao').setValue(this.condicoesDosCampos[0].id);
      this.formfiltro.get('valor').setValue('');

    } catch (error) {
      console.log('erro ', error)
    }
  }

  atualizar() {
    if (this.formfiltro.valid == false

      && !(this.formfiltro.get('valor') == null || this.formfiltro.get('valor').value.length < 1)) {

      this.formfiltro.hasError;
      this.formfiltro.setValidators;
      let mErros = getFormValidationErrors(this.formfiltro) + "\n";
      this.snotifyService.warning("erro no form 93 " + mErros);
    } else {

      this.campoParaFiltro.nomeDoCampo = this.formfiltro.get('nomeDoCampo').value;
      this.campoParaFiltro.condicao = this.formfiltro.get('condicao').value;
      this.campoParaFiltro.valor = this.formfiltro.get('valor').value;
      this.fAtualizaAtualizarPor.emit(this.campoParaFiltro);

    }

    this.fAtualizarMemotext();



  }

  fAtualizarMemotext() {

    this.resumoFiltros = "";
    if (this.formfiltro.valid == true) {

      if (this.formfiltro.get('valor').value.length > 0) {
        this.resumoFiltros += this.fBuscarNomeDoCampo(this.formfiltro.get('nomeDoCampo').value)
          + " " + this.fBuscarCondicao(this.formfiltro.get('condicao').value) + " " + this.formfiltro.get('valor').value;
      }
    }
    //    let camposParaFiltrosUnique: CamposParaFiltros[] = [];1



    let camposParaFiltrosUnique: CamposParaFiltros[] = this.dataSourcecamposParaFiltrosList.data.filter((obj, index, self) =>
      index === self.findIndex((t) => (
        t.grupoFiltro === obj.grupoFiltro
      ))
    );

    const foundObject: CamposParaFiltros = camposParaFiltrosUnique.find(item => item.grupoFiltro == 1);
    if (foundObject == null) {
      let novo: CamposParaFiltros = {};
      novo.grupoFiltro = 1;
      camposParaFiltrosUnique.push(novo);

    }

    camposParaFiltrosUnique.sort((a, b) => a.grupoFiltro - b.grupoFiltro);





    let mGrupoAnt: number = 1;
    camposParaFiltrosUnique.forEach(unico => {



      this.dataSourcecamposParaFiltrosList.data.forEach(item => {
        if (unico.grupoFiltro == item.grupoFiltro) {
          if (mGrupoAnt != item.grupoFiltro) {
            this.resumoFiltros = this.resumoFiltros + (this.resumoFiltros.length > 0 ? ") " : "") + this.fBuscarRelacional(item.relacionarCondicao) + " ( ";
            ;

          }




          this.resumoFiltros += (mGrupoAnt == item.grupoFiltro ? this.fBuscarRelacional(item.relacionarCondicao) : "") + " " +
            this.fBuscarNomeDoCampo(item.nomeDoCampo)
            + " " + this.fBuscarCondicao(item.condicao) + " " + item.valor;
          mGrupoAnt = item.grupoFiltro;

        }
      }

      )


    }
    )

    if (this.resumoFiltros.length > 0) {
      this.resumoFiltros = "(" + this.resumoFiltros + " ) ";
    }

  }

  fAtualizarResumoFiltros() {

    this.fAtualizarMemotext();
    this.atualizar();


  }

  fBuscarNomeDoCampo(pNomeOriginal: String): String {

    let index = this.dataSourceTableFilpadCab.cadTableFilpadCampos.findIndex(x => x.tfpcNomeCampo == pNomeOriginal);
    return this.dataSourceTableFilpadCab.cadTableFilpadCampos[index].tfpcDescricaoCustom;
  }


  fBuscarCondicao(pCondicao: String): string {
    let index = this.condicoesDosCamposGeral.findIndex(x => x.id == pCondicao);
    return this.condicoesDosCamposGeral[index].name;


  }

  fBuscarRelacional(pRelacional: String): string {
    let index = this.mRelacionarCondicao.findIndex(x => x.id == pRelacional);
    return this.mRelacionarCondicao[index].name;


  }

  fMaisFiltros() {

    this.maisFiltrosVisivel = this.maisFiltrosVisivel == true ? false : true;
    this.maisFiltros = this.maisFiltrosVisivel == true ? "Menos Filtros" : "Mais Filtros";

  }

  fConfigTable() {

    this.configurarTabelaVisivel = this.configurarTabelaVisivel == true ? false : true;
    this.configurarTabela = this.configurarTabelaVisivel == true ? "Fechar Config Tabela" : "Mostrar Config Tabela";

  }

  fAjustarDisplayColumnsTable(event) {
    this.refreshTela();
    this.fAjustarDisplayColumnsTableEmit.emit(event);

    this.mAlterouRelatorio = event == "rel";
    this.mAlterouTable = event == "table";

    //    console.log('emitindo evento pesquisar por')

  }
  public refreshTela() {
    this.fAtualizarCamposConsultaPor();
  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  fSalvarTable() {
    try {

      this.showLoading();



      this.dadosComunsService.CadtableFilpadSalvar(this.dataSourceTableFilpadCab).subscribe((Response) => {
        safeCall(Response, () => {

          if (Response.success) {
            this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);
          }
        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }



      );
    } catch (error) {
      this.snotifyService.error(error);

    } finally {
      this.hideLoading();

    }
  }





  fSalvarConfiguracoes() {
    console.log('vai salvar ', (this.mAlterouRelatorio == true ? " relatorio " : ""), (this.mAlterouTable == true ? " Table " : ""));
    if (this.mAlterouTable) {
       this.fSalvarTable();
    }
    this.mAlterouRelatorio = false;
    this.mAlterouTable = false;

  }

  fVisualizarRelatorio() {

    this.telaCheia = this.telaCheia==false;
    this.fTelacheiaEmit.emit(this.telaCheia);
    this.mRelatorio = this.telaCheia==true ? "Mostrar Menu Relatorio" : "Fechar Menu Relatorio" ;



  }
}