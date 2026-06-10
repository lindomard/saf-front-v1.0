import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CadprocExecModel } from '../model/CadprocExecModel';
import { MatPaginator } from '@angular/material/paginator';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { SessionService } from '@base-core/session/session.service';
import { SnotifyService } from 'ng-snotify';
import { VisualizarResultadosService } from '../visualizar-resultados.service';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { MatDialog } from '@angular/material/dialog';
import { CodItemComZerosAEsquerdaComponent } from '../cod-item-com-zeros-a-esquerda/cod-item-com-zeros-a-esquerda.component';
import { Router } from '@angular/router';
import { CamposParaFiltros, FilterFields, OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { fPegarFiltroId, fPegarFiltroName, getCondicoesTodasArray, getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { CamposParaOrdem } from 'src/app/dados-comuns/model/CamposParaOrdem';
import { FieldsFilter } from 'src/app/dados-comuns/model/FieldsFilter';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SaltarRelatorioPadraoModalComponent } from 'src/app/dados-comuns/salvar-relatorio-padrao/saltar-relatorio-padrao-modal/saltar-relatorio-padrao-modal.component';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfigTableModalComponent } from 'src/app/outros-compartilhados/config-table/config-table-modal.component';
import { CamposTabela } from 'src/app/dados-comuns/model/CamposTabela';
import { ConsultasERelatoriosComponent } from 'src/app/dados-comuns/consultas-e-relatorios/consultas-e-relatorios.component';
import { CamposConsultaPor } from 'src/app/dados-comuns/model/CadCamposTabelas';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CadreltabCabModel } from 'src/app/genericos/model/CadrelpadCabModel';
import { CadrelpadCamposModel } from 'src/app/genericos/model/CadrelpadCamposModel';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';


export interface fieldsProperties {
  caption?: String;
  weight?: number;
  mask?: String;
  align?: String;
  name?: String;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],


})
export class ResultadosComponent implements OnInit {


  @ViewChild('instanceConsultasERelatorios', { static: true }) instanceConsultasERelatorios: ConsultasERelatoriosComponent;


  constructor(
    private session: SessionService
    , private snotifyService: SnotifyService
    , private resultadosService: VisualizarResultadosService
    , public dialog: MatDialog

    , private cd: ChangeDetectorRef
    , private router: Router
    , private baixarArquivosService: BaixarArquivosService


  ) { }



  camposDaTabela: CamposTabela[] = [];
  camposConsultaPor: CamposConsultaPor[] = [];
  cadrelpadCabModel: CadTableFilpadCamposModel[] = [];

  dataSourceFiltros = new MatTableDataSource<CamposParaFiltros>([]);

  isLoading = false;

  pesquisarPorcampoParaFiltro: CamposParaFiltros = {};

  condicaoString = getCondicoesTodasArray();
  tipoRelacionarCondicao = getRelacionarCondicao();


  camposParaOrdem: CamposParaOrdem[] = []
  camposParaOrdemInicial: CamposParaOrdem[] = []
  dataSourceOrdem = new MatTableDataSource<CamposParaOrdem>([]);

  camposParaFieldsFilter: FieldsFilter[] = []
  camposParaFieldsFilterInicial: FieldsFilter[] = []
  dataSourceFieldsFilter = new MatTableDataSource<FieldsFilter>([]);


  dataSourceTableFielpad = new MatTableDataSource<CadTableFilpadCabModel>([]);




  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<CadprocExecModel>([]);

  /*
    dataSourceWithPageSize = new MatTableDataSource<CadprocExecModel>([]);
    @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;
    pageLimitOptions: Array<number> = [2, 5, 10, 15, 20];
    filterPaginator: FilterPaginator = {};
  */
  displayedColumns: String[] = ['cpId', 'cpNome', 'cpDatHorIni', 'cpDatHorTermino'
    , 'Visualizar']

  /*    
    displayedColumnsDef: String[] = ['cpId', 'cadprocessos.cpNome', 'cpDatHorIni', 'cpDatHorTermino'
      , 'Visualizar']
  */

  //     displayedColumns2: String[] = ['cpId', 'cpNome']


  captionColumns: fieldsProperties[] = [
    { caption: 'Chave Id', weight: 5, mask: '', align: 'center' },
    { caption: 'Descriçao', weight: 30, mask: '', align: 'center' },
    { caption: 'Data/Hora Inicial', weight: 25, mask: 'datetime', align: 'center' },
    { caption: 'Data/Hora termino', weight: 25, mask: 'datetime', align: 'center' },
    { caption: 'Detalhes', weight: 15, mask: '', align: 'left' }
  ]


  filtrosGenericosLista: FiltrosGenericosModel[] = [];


  tipoAcaoName: String = "Resultados dos Processamentos";

  tipoEvento: String = "Carregando dados...";

  mDisableGerar: boolean = false;

  ngOnInit(): void {
    /*
    let camposDaTabela: CamposTabela = {};
    camposDaTabela.descricaoOri="";
    camposDaTabela.mask="";

    this.camposDaTabela.push(camposDaTabela)
*/
    this.filterPaginator.page = 0;
    this.filterPaginator.size = 15;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.preencherDados();
    this.fBuscarTabelaBase();

    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.mDisableGerar = false;
        this.tipoEvento = "Aguardando....";
      }
    })

    this.fBuscarCadRelPad();



  }


  fRetornaFormatado(pValor: any, pDataMask: String) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }



  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

    this.fBuscarTabelaBase();
  }

  fAtualizarBusca() {
    this.filterPaginator.page = 0;
    this.fBuscarTabelaBase();
  }

  fAtualizarBusca2(event) {
    this.pesquisarPorcampoParaFiltro = event;
    this.filterPaginator.page = 0;
    this.fBuscarTabelaBase();
  }

  /*
    fPegarFiltroId(pArray: any, pNome: String) {
      let index = pArray.findIndex(o => o.name === pNome);
      if (index < 0) {
        index = 0;
      }
  
      return pArray[index].id;
  
    }
  
    fPegarFiltroName(pArray: any, pId: String) {
      let index = pArray.findIndex(o => o.id === pId);
      if (index < 0) {
        index = 0;
      }
      return pArray[index].name;
  
    }
  */

  fAdicionarFiltros() {

    this.dataSourceFiltros.data.forEach(filtro => {
      this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista,
        fPegarFiltroId(this.camposDaTabela, filtro.nomeDoCampo)
        , fPegarFiltroId(this.condicaoString, filtro.condicao)
        , filtro.valor
        , filtro.grupoFiltro
        , fPegarFiltroId(this.tipoRelacionarCondicao, filtro.relacionarCondicao)

      ).adicionarfiltros();


    })

    if (this.filtrosGenericosLista.length == 1) {

      this.filtrosGenericosLista[0].tipoLigacao = " and ";
    }


  }


  fBuscarTabelaBase() {



    this.tipoEvento = "Carregando dados...";


    this.filtrosGenericosLista = [];



    safeCall(this.pesquisarPorcampoParaFiltro.valor, () => {


      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, this.pesquisarPorcampoParaFiltro.nomeDoCampo,
          this.pesquisarPorcampoParaFiltro.condicao, this.pesquisarPorcampoParaFiltro.valor,
          1, getRelacionarCondicao()[0].id).adicionarfiltros();



    })

    this.fAdicionarFiltros();

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "cpIdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "Resultados"
    let orderFieldsLista: OrderFields[] = [];

    this.dataSourceOrdem.data.forEach(ordem => {
      if (ordem.existe) {
        let orderFields: OrderFields = {};
        orderFields.fieldApelido = ordem.apelido + (ordem.decrescente ? "-desc" : "");
        orderFieldsLista.push(orderFields)

      }
    })
    parametrosDados.orderFields = orderFieldsLista;

    // inicio

    let filterFieldsLista: FilterFields[] = [];

    this.dataSourceFieldsFilter.data.forEach(fields => {
      if (fields.selecionado) {
        let filterFields: FilterFields = {};
        filterFields.fieldApelido = fields.apelido;
        filterFieldsLista.push(filterFields)

      }
    })
    parametrosDados.filterFields = filterFieldsLista;

    // termino




    this.resultadosService.BuscarResultadosPage(parametrosDados, this.filterPaginator)
      .subscribe((CadprocExecModel) => {
        safeCall(CadprocExecModel, () => {


          this.dataSourceWithPageSize.data = [...CadprocExecModel.content];

          //          console.log('chegou ', JSON.Stringify(this.dataSourceWithPageSize.data));


          this.filterPaginator.totalElements = CadprocExecModel.totalElements;
          this.filterPaginator.totalPages = CadprocExecModel.totalPages;
          this.filterPaginator.size = CadprocExecModel.pageable.pageSize;
          this.filterPaginator.page = CadprocExecModel.pageable.pageNumber;




          this.tipoEvento = "Aguardando....";



        })
      }, error => {

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
      }
      )


  }


  BaixarArquivo(cadprocExecModel: CadprocExecModel) {

    //let filtrosGenericosLista: FiltrosGenericosModel[] = [];
    if (cadprocExecModel.cpId == 10) {
      let mNome: String = "fVisualizarProcesso" + cadprocExecModel.cpId;



      const dialogRef = this.dialog.open(CodItemComZerosAEsquerdaComponent, {

        panelClass: 'app-no-padding-dialog',
        width: '80%',
        data: {
          idPessoa: this.session.companyId

        }

      });

    } else {
      this.snotifyService.warning("Ainda não Disponivel!")
      let mNome: String = "fVisualizarProcesso" + cadprocExecModel.cpId;



      const dialogRef = this.dialog.open(CodItemComZerosAEsquerdaComponent, {

        panelClass: 'app-no-padding-dialog',
        width: '80%',
        data: {
          idPessoa: this.session.companyId

        }

      });

    }

  }
  preencherDadosPadroes(cadrelpadCabModel: CadreltabCabModel) {

    this.camposParaFieldsFilterInicial = [];
    let mOrdem: number = 0;


    cadrelpadCabModel.cadrelpadCamposModelLista.forEach(campos => {
      if (campos.tfpcOrdemLista > 0) {
        mOrdem++;
        this.camposParaOrdemInicial.push({ "apelido": campos.tfpcNomeCampo, "descricao": campos.tfpcDescricaoCustom, "position": mOrdem, "decrescente": campos.tfpcOrdemResConsDesc == 1, "existe": true })
      }

    })


    cadrelpadCabModel.cadrelpadCamposModelLista.forEach(campos => {
      mOrdem++;
      this.camposParaFieldsFilterInicial.push({ "apelido": campos.tfpcNomeCampo, "descricao": campos.tfpcDescricaoCustom, "position": mOrdem, "selecionado": false })
      let index: number = this.camposParaFieldsFilterInicial.findIndex(x => x.apelido == campos.tfpcNomeCampo);
      if (index > -1) {
        this.camposParaOrdemInicial.push({ "apelido": campos.tfpcNomeCampo, "descricao": campos.tfpcDescricaoCustom, "position": mOrdem, "decrescente": false, "existe": false })
      }
    })



    //    lindomar
    //    this.camposParaFieldsFilterInicial.push({ "apelido": campos.tforNomeCampo, "descricao": campos.descricao, "position": mOrdem, "selecionado" : true })

    // LINDOMAR inicio    
    /*
    cadrelpadCabModel.cadrelpadOrdemResult.forEach(ordem => {
    
      let index: number = this.camposParaOrdem.findIndex(x => x.apelido == ordem.rporNomeCampo);
      if (index > -1) {
        this.camposParaOrdem[index].existe = true;
        this.camposParaOrdem[index].decrescente = ordem.rporDecrescente;
        this.camposParaOrdem[index].position = ordem.rporOrdem;
      }
    
    
      //      
    
    
    })
    */
    // lindomar termino


    this.captionColumns = [];


    console.log('campos gerais', JSON.stringify(cadrelpadCabModel.cadrelpadCamposModelLista));

    cadrelpadCabModel.cadrelpadCamposModelLista.forEach(campos => {
      this.captionColumns.push({
        "caption": campos.tfpcDescricaoCustom, "weight": campos.tfpctamanhoPerc
        , "mask": campos.tfpcMask, "align": campos.tfpcAlign
        , "name": campos.tfpcNomeCampo
      })

    })

    this.camposDaTabela = [];

    cadrelpadCabModel.cadrelpadCamposModelLista.forEach(campos => {
      this.camposDaTabela.push({
        "id": campos.tfpcNomeCampo, "descricaoOri": campos.tfpcDescricaoOri
        , "name": campos.tfpcDescricaoCustom
        , "type": campos.tfpcTipoCampo
        , "length": campos.tfpcTamanho
        , "mask": campos.tfpcMask
      })

    })

    let mDisplayedColumns: String[] = [];

/*

    cadrelpadCabModel.cadrelpadFiltrarModelLista.forEach(campos => {
      mDisplayedColumns.push(campos.rpfNomeCampo);

    })
*/
    mDisplayedColumns.push("Visualizar")

    this.displayedColumns = mDisplayedColumns;
    console.log('displeyd column 385 ', JSON.stringify(this.displayedColumns))

    this.atualizarFiltrosCampos();

    //displayedColumns

  }

  atualizarFiltrosCampos() {
    this.instanceConsultasERelatorios.camposConsultaPor = this.cadrelpadCabModel;


    console.log('campos ', JSON.stringify(this.cadrelpadCabModel))

    this.instanceConsultasERelatorios.atualizarFiltrosCampos();
    this.cd.detectChanges();
  }

  preencherDados() {

    /*
        this.camposDaTabela.push({
          "id": ""
          , "name": ""
          , "descricaoOri": ""
    
          , "type": "String"
          , "length": 0
          , "mask": ""
        });
        */
    //displayedColumns

    this.filtrosGenericosLista = [];
    let parametrosDados: ParametrosDados = {};


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "IdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    this.fAdicionarFiltros();

    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;



    this.resultadosService.buscarCadTableFilPad(parametrosDados)
      .subscribe((Response) => {

        safeCall(Response.objeto, (cadTableFilpadCabModel) => {


          this.preencherDadosPadroes(cadTableFilpadCabModel);

          this.camposParaOrdem = this.camposParaOrdemInicial;
          this.dataSourceOrdem.data = this.camposParaOrdem;

          this.camposParaFieldsFilter = this.camposParaFieldsFilterInicial;
          this.dataSourceFieldsFilter.data = this.camposParaFieldsFilter;
        })

        //        this.snotifyService.warning("datasourcefitler" + JSON.Stringify(this.camposParaFieldsFilter))

      }, error => {
        this.snotifyService.error(error.error.message);
        BaixarArquivosService.terminouDownload.emit(true);

      }
      )









  }

  cancelarESair() {
    if (this.session.companyId == "0") {

      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/home']);
    }

  }
  // planilha inicio



  fBuscarPlanilha() {



    this.tipoEvento = "Gerando Planilha...";

    this.mDisableGerar = false;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "cpIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    this.fAdicionarFiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "resultadosPlanilha"
    let orderFieldsLista: OrderFields[] = [];

    this.dataSourceOrdem.data.forEach(ordem => {
      if (ordem.existe) {
        let orderFields: OrderFields = {};
        orderFields.fieldApelido = ordem.apelido + (ordem.decrescente ? "-desc" : "");
        orderFieldsLista.push(orderFields)

      }
    })
    parametrosDados.orderFields = orderFieldsLista;

    // inicio

    let filterFieldsLista: FilterFields[] = [];

    this.dataSourceFieldsFilter.data.forEach(fields => {
      if (fields.selecionado) {
        let filterFields: FilterFields = {};
        filterFields.fieldApelido = fields.apelido;
        filterFieldsLista.push(filterFields)

      }
    })
    parametrosDados.filterFields = filterFieldsLista;

    // termino




    this.resultadosService.BuscarResultadosPlanilhas(parametrosDados)
      .subscribe((nomeDoArquivoGeradoModelLista) => {
        safeCall(nomeDoArquivoGeradoModelLista, () => {
          this.baixarPlanilhas(nomeDoArquivoGeradoModelLista);


        })
      }, error => {
        this.snotifyService.error(error.error.message);
        BaixarArquivosService.terminouDownload.emit(true);

      }
      )




  }

  baixarPlanilhas(nomeDoArquivoGeradoModel: NomeDoArquivoGeradoModel[]) {


    nomeDoArquivoGeradoModel.forEach(obj => {
      if (obj.nomeDoArquivoGerado != null && obj.nomeDoArquivoGerado.length > 0) {
        this.baixarArquivosService.downloadarquivo(obj.nomeDoArquivoGerado);

      }
      BaixarArquivosService.terminouDownload.emit(false)

    });





  }


  // planilha termino

  // inicio relatorio







  // termino relatorio
  baixarRelatorio() {


    //    this.snotifyService.warning("vai baixar relatorio");
    this.tipoEvento = "Gerando Relatorio...";

    this.mDisableGerar = false;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "cpIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    this.fAdicionarFiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadprocexecRelatorio"
    let orderFieldsLista: OrderFields[] = [];

    this.dataSourceOrdem.data.forEach(ordem => {
      if (ordem.existe) {
        let orderFields: OrderFields = {};
        orderFields.fieldApelido = ordem.apelido + (ordem.decrescente ? "-desc" : "");
        orderFieldsLista.push(orderFields)

      }
    })
    parametrosDados.orderFields = orderFieldsLista;

    // inicio

    let filterFieldsLista: FilterFields[] = [];

    this.dataSourceFieldsFilter.data.forEach(fields => {
      if (fields.selecionado) {
        let filterFields: FilterFields = {};
        filterFields.fieldApelido = fields.apelido;
        filterFieldsLista.push(filterFields)

      }
    })
    parametrosDados.filterFields = filterFieldsLista;
    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "cadprocexecRelatorio";

    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    // termino





  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  fSalvarRelatorioPadrao(pNomeRel: String) {

    let cadrelpadCabModel: CadreltabCabModel = {};
    cadrelpadCabModel.tfpcForm = "resultados";
    cadrelpadCabModel.tfpcIdPessoa = parseInt(this.session.companyId);
    cadrelpadCabModel.tfpcNome = pNomeRel;

    let cadrelpadOrderFieldsModelLista: CadrelpadCamposModel[] = [];
    let cadrelpadOrdemResultModelLista: CadrelpadCamposModel[] = [];


    let mOrdem: number = 0;
    this.dataSourceFieldsFilter.data.forEach(fields => {
      if (fields.selecionado) {

        let cadrelpadOrderFieldsModel: CadrelpadCamposModel = {};
        mOrdem++;

        cadrelpadOrderFieldsModel.tfpcNomeCampo = fields.apelido;
        cadrelpadOrderFieldsModel.tfpcOrdemRel = mOrdem;
        cadrelpadOrderFieldsModelLista.push(cadrelpadOrderFieldsModel);

      }
    })

    mOrdem = 0;
    this.dataSourceOrdem.data.forEach(ordem => {
      if (ordem.existe) {
        mOrdem++;
        let cadrelpadOrdemResultModel: CadrelpadCamposModel = {};
        cadrelpadOrdemResultModel.tfpcNomeCampo = ordem.apelido;
        cadrelpadOrdemResultModel.tfpcOrdemRelResultDesc = ordem.decrescente == true ? 1 : 0;
        cadrelpadOrdemResultModel.tfpcOrdemRelResult = mOrdem;
        cadrelpadOrdemResultModelLista.push(cadrelpadOrdemResultModel);
      }
    })


    mOrdem = 0;

    this.dataSourceFiltros.data.forEach(filtro => {

      mOrdem++;
      /*
      let cadrelpadFiltrarModel: CadrelpadFiltrarModel = {};
      cadrelpadFiltrarModel.rpfNomeCampo = fPegarFiltroId(this.camposDaTabela, filtro.nomeDoCampo)
      cadrelpadFiltrarModel.rpfCondicao = fPegarFiltroId(this.condicaoString, filtro.condicao);
      cadrelpadFiltrarModel.rpfOrdem = mOrdem;
      cadrelpadFiltrarModel.rpfEOuOr = fPegarFiltroId(this.tipoRelacionarCondicao, filtro.relacionarCondicao);
      cadrelpadFiltrarModel.rpfValor = filtro.valor;
      cadrelpadFiltrarModel.rpfGrupo = filtro.grupoFiltro;

      cadrelpadFiltrarModelLista.push(cadrelpadFiltrarModel);
*/
      //inicio 
      //fPegarFiltroId(this.camposDaTabela, filtro.nomeDoCampo)
      //, fPegarFiltroId(this.condicaoString, filtro.condicao)

      // termino


    })


    /*
        mOrdem = 0;
        this.dataSourceFieldsFilter.data.forEach(fields => {
          if (fields.selecionado) {
    
            let cadrelpadOrderFieldsModel: CadrelpadOrderFieldsModel = {};
            mOrdem++;
    
            cadrelpadOrderFieldsModel.rpofNomeCampo = fields.apelido;
            cadrelpadOrderFieldsModel.rpofOrdem = mOrdem;
            cadrelpadOrderFieldsModelLista.push(cadrelpadOrderFieldsModel);
    
          }
        })
    
    */

    cadrelpadCabModel.cadrelpadCamposModelLista = cadrelpadOrderFieldsModelLista;









    try {

      this.showLoading();



      this.resultadosService.salvarTabelasPadrao(cadrelpadCabModel).subscribe((Response) => {
        safeCall(Response, () => {

          if (Response.success) {
            this.fBuscarCadRelPad();
            this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);


          }
        })
      }, error => {
        this.snotifyService.error(HttpMensage(error));
      }



      );
    } catch (error) {
      this.snotifyService.error(HttpMensage(error));

    } finally {
      this.hideLoading();

    }

  }


  fSalvarRelatorioPadraoDialog() {

    const dialogRef = this.dialog.open(SaltarRelatorioPadraoModalComponent, {

      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idPessoa: this.session.companyId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      safeCallOrNull(result, (res) => {
        this.fSalvarRelatorioPadrao(res);


      },
        () => { });
    });



  }


  // inicio 


  fBuscarCadRelPad() {


    this.showLoading();


    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "tfpcIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();

    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    let orderFieldsLista: OrderFields[] = [];

    this.dataSourceOrdem.data.forEach(ordem => {
      if (ordem.existe) {
        let orderFields: OrderFields = {};
        orderFields.fieldApelido = "name";
        orderFieldsLista.push(orderFields)

      }
    })
    parametrosDados.orderFields = orderFieldsLista;




    this.resultadosService.buscarTabelasPadrao(parametrosDados)
      .subscribe((DadosParaComboboxModelLista) => {
        safeCall(DadosParaComboboxModelLista, () => {




          this.tipoEvento = "Aguardando....";
          let dadosParaComboboxModel: DadosParaComboboxModel = {};


          this.hideLoading();


        })
      }, error => {
        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
        this.hideLoading();
      }
      )


  }


  // termino

  // inicio relpad lista

  fBuscarRelatorioPadrao(idRel: number) {

    if (idRel == undefined || idRel == null || idRel == 0) {
      this.dataSourceFiltros.data = [];
      //      this.instanceFiltrosCampos.refresh();

      this.camposParaFieldsFilter = [];
      this.dataSourceFieldsFilter.data = [];
      //      this.instanceFieldsFilter.refresh();

      this.camposParaOrdem = [];
      this.dataSourceOrdem.data = [];
      //      this.instanceOrdemCampos.refresh();

      this.preencherDados();
      //      this.instanceFieldsFilter.marcar();
      return;
    }

    this.showLoading();


    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "tfpcIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "tfpcId", "=", idRel.toString(),
        1, getRelacionarCondicao()[0].id).adicionarfiltros();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    let orderFieldsLista: OrderFields[] = [];


/*


    this.resultadosService.buscarRelatorioPadrao(parametrosDados)
      .subscribe((cadrelpadCabModelLista) => {
        safeCall(cadrelpadCabModelLista, () => {




          this.tipoEvento = "Aguardando....";
          if (cadrelpadCabModelLista.length > 0) {
            this.fAtribuirRelatorioPadrao(cadrelpadCabModelLista[0]);
          }


        })
        this.hideLoading();

      }, error => {
        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
        this.hideLoading();
      }
      )
*/

  }

  fAtribuirRelatorioPadrao(cadrelpadCabModel: CadreltabCabModel) {


    this.dataSourceFiltros.data = [];
    /*
        this.instanceFiltrosCampos.refresh();
    
        console.log('da instancia ', JSON.Stringify(this.instanceFiltrosCampos.camposDaTabela));
    */
    //    this.instanceFiltrosCampos.clickCamposDaTabela(0);
    /*
        this.instanceFiltrosCampos.refresh();
        console.log('da instancia depois ', JSON.Stringify(this.instanceFiltrosCampos.camposDaTabela));
    */





    // campos para filtros filtrar por 

    // campos para filtros filtrar por 

    this.camposParaFieldsFilter.forEach(campos => {
      campos.selecionado = false;
    })

    cadrelpadCabModel.cadrelpadCamposModelLista.forEach(ordem => {

      if (ordem.tfpcOrdemLista > 0) {
        let index: number = this.camposParaFieldsFilter.findIndex(x => x.apelido == ordem.tfpcNomeCampo);
        if (index > -1) {
          this.camposParaFieldsFilter[index].selecionado = true;
          this.camposParaFieldsFilter[index].position = ordem.tfpcOrdemLista;
        }
      }
    })


    this.camposParaFieldsFilter =
      this.camposParaFieldsFilter.sort((a, b) => {
        const nameA = a.position; // ignore upper and lowercase
        const nameB = b.position; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });



    //    this.dataSourceOrdem.data = [];


    let mQtdOrdem = cadrelpadCabModel.cadrelpadCamposModelLista.length;
    this.camposParaOrdem = this.camposParaOrdemInicial;

    if (mQtdOrdem > 0) {
      this.camposParaOrdem.forEach(ordem => {

        ordem.position += mQtdOrdem;
      })
    }

    this.camposParaOrdem.forEach(ordem => {
      ordem.existe = false;
    })


    cadrelpadCabModel.cadrelpadCamposModelLista.forEach(ordem => {
      if (ordem.tfpcOrdemLista > 0) {

        let index: number = this.camposParaOrdem.findIndex(x => x.apelido == ordem.tfpcNomeCampo);
        if (index > -1) {
          this.camposParaOrdem[index].existe = true;
          this.camposParaOrdem[index].decrescente = ordem.tfpcOrdemResConsDesc == 1 ? true : false;
          this.camposParaOrdem[index].position = ordem.tfpcOrdemLista;
        }


      }
      //      


    })


    this.camposParaOrdem =
      this.camposParaOrdem.sort((a, b) => {
        const nameA = a.position; // ignore upper and lowercase
        const nameB = b.position; // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
    //    this.instanceOrdemCampos.refresh();



    //  this.dataSourceFieldsFilter.data = [];


    let mQtdFieldsFilter = cadrelpadCabModel.cadrelpadCamposModelLista.length;
    this.camposParaFieldsFilter = this.camposParaFieldsFilterInicial;

    if (mQtdFieldsFilter > 0) {
      this.camposParaFieldsFilter.forEach(fiedsFilter => {
        fiedsFilter.position += mQtdFieldsFilter;
      })
    }


    this.cd.detectChanges();

    this.instanceConsultasERelatorios.atualizarFiltrosCampos();


    //    this.instanceFieldsFilter.refresh();



  }

  drop(event: CdkDragDrop<String[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  getStyle(any) {
    //  return { 'flex': '0 0 20%' }

    let perc: number = 20;
    return { 'flex': `0 0 ${perc}%;` };

  }


  getColumnName(pNomeCampo) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    //    getColumnName


    //  let index: number = this.displayedColumns.indexOf(any);

    //    console.log('procurando campo ', any, "index ", index);
    if (index < 0) {
      return
    } else {
      let mCaption: String = this.captionColumns[index].caption;

      return mCaption;
    }
  }

  // termino

  // termino relpad lista


  getStyle3(any) {

    let index: number = this.displayedColumns.indexOf(any);

    let mTamanho: number = this.captionColumns[index].weight;

    return ' ' + mTamanho + '% ';

  }

  getAlingn(pNomeCampo) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    //    let index: number = this.displayedColumns.indexOf(any);
    if (index > -1) {

      let mAlign: String = this.captionColumns[index].align;
      if (mAlign === "right") {
        return "text-align:right";
      } else if (mAlign === "center") {
        return "text-align:center";
      } else
        return "text-align:left";

    }
  }

  // salvar fields tabela padrao 

  fSalvarConfigTablesDialog() {

    const dialogRef = this.dialog.open(ConfigTableModalComponent, {

      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idPessoa: this.session.companyId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      safeCallOrNull(result, (res) => {
        this.fSalvarConfigTablesPadrao(res);


      },
        () => { });
    });

  }


  fSalvarConfigTablesPadrao(pNomeRel: String) {



    let cadTableFilpadCabModel: CadTableFilpadCabModel = {};
    cadTableFilpadCabModel.tfpcForm = "resultados";
    cadTableFilpadCabModel.tfpcIdPessoa = parseInt(this.session.companyId);
//    cadTableFilpadCabModel.tfpcNome = pNomeRel;

    /*
        let cadTableFilpadDetModelLista: CadTableFilpadDetModel[] = [];
    
    
        let mOrdem: number = 0;
        this.dataSourceTableFielpad.data.forEach(fields => {
          if (fields.selecionado) {
    
            let cadrelpadOrderFieldsModel: CadrelpadOrderFieldsModel = {};
            mOrdem++;
    
            cadrelpadOrderFieldsModel.rpofNomeCampo = fields.apelido;
            cadrelpadOrderFieldsModel.rpofOrdem = mOrdem;
            cadrelpadOrderFieldsModelLista.push(cadrelpadOrderFieldsModel);
    
          }
        })
    
        mOrdem = 0;
        this.dataSourceOrdem.data.forEach(ordem => {
          if (ordem.existe) {
            mOrdem++;
            let cadrelpadOrdemResultModel: CadrelpadOrdemResultModel = {};
            cadrelpadOrdemResultModel.rporNomeCampo = ordem.apelido;
            cadrelpadOrdemResultModel.rporDecrescente = ordem.decrescente;
            cadrelpadOrdemResultModel.rporOrdem = mOrdem;
            cadrelpadOrdemResultModelLista.push(cadrelpadOrdemResultModel);
          }
        })
    
    
        mOrdem = 0;
    
        this.dataSourceFiltros.data.forEach(filtro => {
    
          mOrdem++;
          let cadrelpadFiltrarModel: CadrelpadFiltrarModel = {};
          cadrelpadFiltrarModel.rpfNomeCampo = fPegarFiltroId(this.camposDaTabela, filtro.nomeDoCampo)
          cadrelpadFiltrarModel.rpfCondicao = fPegarFiltroId(this.condicaoString, filtro.condicao);
          cadrelpadFiltrarModel.rpfOrdem = mOrdem;
          cadrelpadFiltrarModel.rpfEOuOr = fPegarFiltroId(this.tipoRelacionarCondicao, filtro.relacionarCondicao);
          cadrelpadFiltrarModel.rpfValor = filtro.valor;
          cadrelpadFiltrarModel.rpfGrupo = filtro.grupoFiltro;
    
          cadrelpadFiltrarModelLista.push(cadrelpadFiltrarModel);
    
          //inicio 
          //fPegarFiltroId(this.camposDaTabela, filtro.nomeDoCampo)
          //, fPegarFiltroId(this.condicaoString, filtro.condicao)
    
          // termino
    
    
        })
    
    
        /*
            mOrdem = 0;
            this.dataSourceFieldsFilter.data.forEach(fields => {
              if (fields.selecionado) {
        
                let cadrelpadOrderFieldsModel: CadrelpadOrderFieldsModel = {};
                mOrdem++;
        
                cadrelpadOrderFieldsModel.rpofNomeCampo = fields.apelido;
                cadrelpadOrderFieldsModel.rpofOrdem = mOrdem;
                cadrelpadOrderFieldsModelLista.push(cadrelpadOrderFieldsModel);
        
              }
            })
        
        */
    /*
        cadrelpadCabModel.cadrelpadFiltrar = cadrelpadFiltrarModelLista;
        cadrelpadCabModel.cadrelpadOrderFields = cadrelpadOrderFieldsModelLista;
        cadrelpadCabModel.cadrelpadOrdemResult = cadrelpadOrdemResultModelLista;
    
    
    
    
    
    
    
    
    
        try {
    
          this.showLoading();
    
    
    
          this.resultadosService.salvarTabelasPadrao(cadrelpadCabModel).subscribe((Response) => {
            safeCall(Response, () => {
    
              if (Response.success) {
                this.fBuscarCadRelPad();
                this.snotifyService.info("Salvo Com sucesso! Chave Id " + Response.idNumber);
    
    
              }
            })
          }, error => {
            this.snotifyService.error(HttpMensage(error));
          }
    
    
    
          );
        } catch (error) {
          this.snotifyService.error(HttpMensage(error));
    
        } finally {
          this.hideLoading();
    
        }
    */
  }




  // salvar fields tabela padrao



  fValorENomeDoCampoParaformatar(pValor: CadprocExecModel, pNomeCampo: string) {

    //    console.log('valor ', JSON.Stringify(pValor));

    let mValor: String = "";
    if (pNomeCampo === "cadprocessos.cpNome") {
      mValor = pValor.cadprocessos.cpNome;
    } else if (pNomeCampo === "cadprocessos.cpId") {
      mValor = pValor.cadprocessos.cpId.toString();
    } else if (pNomeCampo === "cadprocessos.cpTemRelatorio") {
      mValor = pValor.cadprocessos.cpTemRelatorio.toString();

    } else {
      mValor = pValor[pNomeCampo];

    }
    //    console.log('valor do item ', pValor[1]);
    //    console.log('valor ', JSON.Stringify(pValor));
    //console.log('cadprocesso ', JSON.Stringify(pValor["cadprocessos.cpNome"]));
    //    console.log('pnome do campo  ',  pNomeCampo, ' valor ',pValor['cadprocessos.cpNome']);

    //    dataSourceWithPageSize = new MatTableDataSource<CadprocExecModel>([]);


    //  

    //   return pValor[pNomeCampo];
    /*
 
 
     console.log('valor ', JSON.Stringify(pValor));
 //    [column]
 
 */


    let mIndex = this.captionColumns.findIndex(x => x.name == pNomeCampo);


    let mTipoCampo: String = this.captionColumns[mIndex].mask;
    //    console.log('tipo do campo ', mTipoCampo, 'index ', index);
    //  console.log('caption '+ JSON.Stringify(this.captionColumns));

    //    console.log('valor cpnome ', pValor.cadprocessos.cpNome)


    return this.fRetornaFormatado(mValor, mTipoCampo);

  }




}


