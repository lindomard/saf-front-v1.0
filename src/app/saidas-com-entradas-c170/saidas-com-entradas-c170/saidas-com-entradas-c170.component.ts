import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SessionService } from '@base-core/session/session.service';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { SnotifyService } from 'ng-snotify';
import { Cadrc170SaidasComEntradasModel } from '../model/Cadrc170SaidasComEntradasModel';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { CamposParaFiltros, FilterFields, OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { fConverterPerc595, fPegarFiltroId, fPegarFiltroName, getCondicoesTodasArray, getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { SaidasComEntradasC170Service } from '../saidas-com-entradas-c170.service';
import { CamposParaOrdem } from 'src/app/dados-comuns/model/CamposParaOrdem';
import { FieldsFilter } from 'src/app/dados-comuns/model/FieldsFilter';
import { CamposTabela } from 'src/app/dados-comuns/model/CamposTabela';
import { ConsultasERelatoriosComponent } from 'src/app/dados-comuns/consultas-e-relatorios/consultas-e-relatorios.component';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { SaltarRelatorioPadraoModalComponent } from 'src/app/dados-comuns/salvar-relatorio-padrao/saltar-relatorio-padrao-modal/saltar-relatorio-padrao-modal.component';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { CadrelpadCamposModel } from 'src/app/genericos/model/CadrelpadCamposModel';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CamposGeralTabela } from 'src/app/dados-comuns/model/CadCamposTabelas';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { CadreltabCabModel } from 'src/app/genericos/model/CadrelpadCabModel';


export interface fieldsProperties {
  caption?: String;
  weight?: number;
  mask?: String;
  align?: String;
  name?: String;
}

@Component({
  selector: 'app-saidas-com-entradas-c170',
  templateUrl: './saidas-com-entradas-c170.component.html',
  styleUrls: ['./saidas-com-entradas-c170.component.scss']
})
export class SaidasComEntradasC170Component implements OnInit {

  constructor(
    private session: SessionService
    , private snotifyService: SnotifyService
    , public dialog: MatDialog
    , private saidasComEntradasC170Service: SaidasComEntradasC170Service
    , private cd: ChangeDetectorRef
    , private router: Router
    , private baixarArquivosService: BaixarArquivosService



  ) { }

  isLoading = false;
  tipoAcaoName: string = "Carregando dados...";
  tipoEvento: string = "Carregando dados...";

  mDisableGerar: boolean = false;

  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;
  @ViewChild('instanceConsultasERelatorios', { static: true }) instanceConsultasERelatorios: ConsultasERelatoriosComponent;

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<Cadrc170SaidasComEntradasModel>([]);
  displayedColumns: String[] = ['chassis', 'saiDescrItem', 'saiDtDoc', 'saiVlDoc', 'saiCfop', 'saiNomeCliente',
    'entDtDoc', 'entVlDoc', 'entCfop', 'entNomeFor'


  ]


  captionColumns: fieldsProperties[] = [
    { caption: 'Chassis', weight: 8, mask: '', align: 'center', name: 'chassis' },
    { caption: 'Descriçao Venda', weight: 15, mask: '', align: 'center', name: 'saiDescrItem' },
    { caption: 'Data Venda', weight: 6, mask: 'date', align: 'center', name: 'saiDtDoc' },
    { caption: 'Valor Venda', weight: 7, mask: 'valor2dec', align: 'right', name: 'saiVlDoc' },
    { caption: 'cfop', weight: 3, mask: '', align: 'center', name: 'saiCfop' },
    { caption: 'Comprador', weight: 15, mask: '', align: 'center', name: 'saiNomeCliente' },
    { caption: 'Descriçao Compra', weight: 15, mask: '', align: 'center', name: 'entDescrItem' },
    { caption: 'Data Compra', weight: 6, mask: 'date', align: 'center', name: 'entDtDoc' },
    { caption: 'Valor Compra', weight: 7, mask: 'valor2dec', align: 'right', name: 'entVlDoc' },
    { caption: 'cfop', weight: 3, mask: '', align: 'center', name: 'entCfop' },
    { caption: 'Fornecedor', weight: 15, mask: '', align: 'center', name: 'entNomeFor' }
  ]
  pesquisarPorcampoParaFiltro: CamposParaFiltros = {};

  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  // dados para filtros novo 12022025

  cadTableFilpadCabModel: CadTableFilpadCabModel = {};
  camposConsultaPor: CadrelpadCamposModel[] = [];


  // dados para filtros novo fintal 12022025




  // dados para filtros inicio


  camposParaOrdem: CamposParaOrdem[] = []
  camposParaOrdemInicial: CamposParaOrdem[] = []
  dataSourceOrdem = new MatTableDataSource<CamposParaOrdem>([]);

  camposParaFieldsFilter: FieldsFilter[] = []
  camposParaFieldsFilterInicial: FieldsFilter[] = []
  dataSourceFieldsFilter = new MatTableDataSource<FieldsFilter>([]);
  dataSourceTableFielpad = new MatTableDataSource<CadTableFilpadCabModel>([]);
  camposDaTabela:  CadTableFilpadCamposModel[] = [];
  cadrelpadCabModel: CadreltabCabModel[] = [];
  dataSourceFiltros = new MatTableDataSource<CamposParaFiltros>([]);
  condicaoString = getCondicoesTodasArray();
  tipoRelacionarCondicao = getRelacionarCondicao();


  // dados para filtros termino



  ngOnInit(): void {

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 10;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.fBuscarGetTableFieldsList();

    this.preencherDados();
    this.fBuscarTabelaBase();

    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.mDisableGerar = false;
        this.tipoEvento = "Aguardando....";
      }
    })


  }

  // inicio



  preencherDados() {


    this.filtrosGenericosLista = [];
    let parametrosDados: ParametrosDados = {};


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "IdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    //  this.fAdicionarFiltros();

    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;


    /*
      this.resultadosService.buscarCadTableFilPad(parametrosDados)
        .subscribe((cadTableFilpadCabModel) => {
          this.preencherDadosPadroes(cadTableFilpadCabModel);
    
          this.camposParaOrdem = this.camposParaOrdemInicial;
          this.dataSourceOrdem.data = this.camposParaOrdem;
    
          this.camposParaFieldsFilter = this.camposParaFieldsFilterInicial;
          this.dataSourceFieldsFilter.data = this.camposParaFieldsFilter;
    
          
        }, error => {
          this.snotifyService.error(error.error.message);
          BaixarArquivosService.terminouDownload.emit(true);
    
        }
        )
    */








  }

  // termino


  cancelarESair() {
    if (this.session.companyId == "0") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/home']);
    }

  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }



  getStyle3(any) {
    let index: number = this.displayedColumns.indexOf(any);
    if (index < 0) {
      console.log('campo nao encontrado ', any)
      return 3
    } else {
      let mTamanho: number = fConverterPerc595(this.captionColumns[index].weight);
      console.log('campo ',this.captionColumns[index].name,' tamanho pixel ',
      this.captionColumns[index].weight, ' convertido % ' , mTamanho);
      return ' ' + mTamanho + '% ';
    }
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

  public getColumnName(pNomeCampo) {
    //    console.log('nome do campo 184 ', pNomeCampo)
    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return pNomeCampo
    } else {
      let mCaption: String = this.captionColumns[index].caption;

      return mCaption;
    }
  }


  fValorENomeDoCampoParaformatar(pValor: Cadrc170SaidasComEntradasModel, pNomeCampo: string) {



    let mValor: String = "";
    mValor = pValor[pNomeCampo];
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: String = this.captionColumns[mIndex].mask;


      return this.fRetornaFormatado(mValor, mTipoCampo);
    }

  }

  fRetornaFormatado(pValor: any, pDataMask: String) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }

  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

    this.fBuscarTabelaBase();
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
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "Resultados"

    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;



    /*  
      let orderFieldsLista: OrderFields[] = [];
    
      this.dataSourceOrdem.data.forEach(ordem => {
        if (ordem.existe) {
          let orderFields: OrderFields = {};
          orderFields.fieldApelido = ordem.apelido + (ordem.decrescente ? "-desc" : "");
          orderFieldsLista.push(orderFields)
    
        }
      })
      parametrosDados.orderFields = orderFieldsLista;
    */
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




    this.saidasComEntradasC170Service.BuscarResultadosPage(parametrosDados)
      .subscribe((response) => {
        safeCall(response, () => {


          if (response.success) {
            this.dataSourceWithPageSize.data = [...response.objeto.content];
            this.filterPaginator.page = response.objeto.pageable.pageNumber;
            this.filterPaginator.size = response.objeto.pageable.pageSize;
            this.filterPaginator.totalElements = response.objeto.totalElements;
            this.filterPaginator.totalPages = response.objeto.totalPages;


            // this.dataSourceWithPageSize.data.forEach( dados=> {

            //   console.log('nome do item comprado ', dados.entDescrItem )
            //   console.log('nome do item vendido ', dados.saiDescrItem )
            //   console.log('chassis ', dados.chassis )

            // })



          } else {
            this.snotifyService.error(response.error);
          }


          this.tipoEvento = "Aguardando....";



        })
      }, error => {

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
      }
      )


  }

  // inicio

  fAtualizarBusca2(event) {


    this.pesquisarPorcampoParaFiltro = event;
    this.filterPaginator.page = 0;
    this.fBuscarTabelaBase();
  }


  atualizarFiltrosCampos() {
    this.instanceConsultasERelatorios.camposConsultaPor = this.camposConsultaPor;

    console.log('campos ', JSON.stringify(this.camposConsultaPor))

    this.instanceConsultasERelatorios.atualizarFiltrosCampos();
    this.cd.detectChanges();
  }



  preencherDadosPadroes(cadrelpadCabModel: CadTableFilpadCabModel) {

    this.camposParaFieldsFilterInicial = [];
    let mOrdem: number = 0;


    cadrelpadCabModel.cadTableFilpadCampos.forEach(campos => {
      if (campos.selecionado) {
      mOrdem++;
      this.camposParaOrdemInicial.push({ "apelido": campos.tfpcNomeCampo, "descricao": campos.tfpcDescricaoCustom,
       "position": mOrdem, "decrescente": campos.tfpcOrdemRelResultDesc, "existe": true })
      }

    })


    cadrelpadCabModel.cadTableFilpadCampos.forEach(campos => {
      mOrdem++;
      this.camposParaFieldsFilterInicial.push({ "apelido": campos.tfpcNomeCampo, "descricao": campos.tfpcDescricaoCustom, "position": mOrdem, "selecionado": false })
      let index: number = this.camposParaFieldsFilterInicial.findIndex(x => x.apelido == campos.tfpcNomeCampo);
      if (index > -1) {
        this.camposParaOrdemInicial.push({ "apelido": campos.tfpcNomeCampo, "descricao": campos.tfpcDescricaoCustom, "position": mOrdem, "decrescente": false, "existe": false })
      }
    })



    this.captionColumns = [];


    console.log('campos gerais', JSON.stringify(cadrelpadCabModel.cadTableFilpadCampos));

    cadrelpadCabModel.cadTableFilpadCampos.forEach(campos => {
      this.captionColumns.push({
        "caption": campos.tfpcDescricaoCustom, "weight": campos.tfpcTamanhoPerc
        , "mask": campos.tfpcMask, "align": campos.tfpcAlign
        , "name": campos.tfpcNomeCampo
      })

    })

/*
    this.camposDaTabela = [];

    cadrelpadCabModel.cadTableFilpadCampos.forEach(campos => {
      this.camposDaTabela.push({
        "id": campos.tfpcNomeCampo, "descricaoOri": campos.tfpcDescricaoOri
        , "name": campos.tfpcDescricaoCustom
        , "type": campos.dataType
        , "length": campos.tamanhoCampo
        , "mask": campos.tfpcMask
      })

    })

*/


    let mDisplayedColumns: String[] = [];
    cadrelpadCabModel.cadTableFilpadCampos.forEach(campos => {
      mDisplayedColumns.push(campos.tfpcNomeCampo);

    })

    mDisplayedColumns.push("Visualizar")

    this.displayedColumns = mDisplayedColumns;
    console.log('displeyd column 385 ', JSON.stringify(this.displayedColumns))

    this.atualizarFiltrosCampos();

    //displayedColumns

  }


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

  fPegarNameCampoDescr(pArray: any, pId: String) {
    let index = pArray.findIndex(o => o.tfpcDescricaoCustom === pId);
    if (index < 0) {
      console.log('nao encontrado index ', index, ' id param ', pId, ' parrray ', JSON.stringify(pArray));
    } else return pArray[index].tfpcNomeCampo;

  }


  fAdicionarFiltros() {

    this.dataSourceFiltros.data.forEach(filtro => {
      this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista,
        this.fPegarNameCampoDescr(this.camposDaTabela, filtro.nomeDoCampo)
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




    this.saidasComEntradasC170Service.BuscarResultadosPlanilhas(parametrosDados)
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

  /*
  
     a partir daqui segue todos os campos da da tabela
     , campos consultar por 
     ,mais filtros primarios(filtros customizados)
     ,orderm resultados
  
  
  */


  fBuscarGetTableFieldsList() {


    this.showLoading();

    console.log('buscando os dados filtros ', new Date())

    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "tfpcIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();

    let parametrosDados: ParametrosDados = {};

    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;

    /*
    let orderFieldsLista: OrderFields[] = [];
  
    this.dataSourceOrdem.data.forEach(ordem => {
      if (ordem.existe) {
        let orderFields: OrderFields = {};
        orderFields.fieldApelido = "name";
        orderFieldsLista.push(orderFields)
  
      }
    })
    parametrosDados.orderFields = orderFieldsLista;
  */



    /*
  tfpcTamanhoPercFixo?: number,
    tfpcAlign?: string,
    tfpcMask?: string,
    tfpcId?: number,
    tfpcNomeCampo?: string,
    tfpcOrdem?: number,
    tfpcDescricaoCustom?: string,
    tfpcDescricaoOri?: string,
    tfpcTamanhoPerc?: number,
    tamanhoCampo?: number,
    qtdDec?: number,
    dataType?: string

   

   if (this.camposConsultaPor.length<1) {
     let camposConsultaPor2: CamposConsultaPor = {};
     this.camposConsultaPor.push(camposConsultaPor2);
   }

    this.camposConsultaPor[0].tfpcId=1;
    this.camposConsultaPor[0].tfpcNomeCampo='teste';
 */


    this.saidasComEntradasC170Service.buscarGetTableFieldsList(parametrosDados)
      .subscribe((responseRet) => {
        safeCall(responseRet, () => {

          


          this.tipoEvento = "Aguardando....";
          if (responseRet.success) {
            this.cadTableFilpadCabModel = responseRet.objeto;

//            this.camposConsultaPor = this.cadTableFilpadCabModel.cadTableFilpadCampos;
            this.camposDaTabela = this.cadTableFilpadCabModel.cadTableFilpadCampos;
//            console.log('chegou 749', JSON.stringify(this.camposConsultaPor))


          } else {
            this.snotifyService.error(responseRet.error);
          }

          this.cd.detectChanges();

          this.instanceConsultasERelatorios.atualizarFiltrosCampos();
      
          this.hideLoading();


        })
      }, error => {
        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
        this.hideLoading();
      }
      )


  }



  /*
   TERMINO DOS CAMPOS da tabelas com suas aplicacoes
  
  
  */




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



  fSalvarRelatorioPadrao(pNomeRel: string) {

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
        cadrelpadOrderFieldsModel.tfpcOrdem = mOrdem;
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
        cadrelpadOrdemResultModel.tfpcOrdemLista = mOrdem;
        cadrelpadOrdemResultModelLista.push(cadrelpadOrdemResultModel);
      }
    })


    mOrdem = 0;
/*      

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


    })

*/


    cadrelpadCabModel.cadrelpadCamposModelLista = cadrelpadOrderFieldsModelLista;









    try {

      this.showLoading();



      this.saidasComEntradasC170Service.salvarTabelasPadrao(cadrelpadCabModel).subscribe((Response) => {
        safeCall(Response, () => {

          if (Response.success) {
            //            this.fBuscarCadRelPad();
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


  // termino



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
    
    
    
        this.saidasComEntradasC170Service.buscarRelatorioPadrao(parametrosDados)
          .subscribe((cadrelpadCabModelLista) => {
            console.log('o que chega .com ', JSON.stringify(cadrelpadCabModelLista));
            safeCall(cadrelpadCabModelLista, () => {
    
    
    
    
              console.log('chegou no resultados cadrelpadcab');
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
    cadrelpadCabModel.cadrelpadFiltrarModelLista.forEach(filtra => {
      let camposParaFiltros: CamposParaFiltros = {};
      camposParaFiltros.nomeDoCampo = fPegarFiltroName(this.camposDaTabela, filtra.rpfNomeCampo);
      camposParaFiltros.condicao = fPegarFiltroName(this.condicaoString, filtra.rpfCondicao);
      camposParaFiltros.valor = filtra.rpfValor;
      camposParaFiltros.grupoFiltro = filtra.rpfGrupo;
      camposParaFiltros.relacionarCondicao =
        fPegarFiltroName(this.tipoRelacionarCondicao, filtra.rpfEOuOr);
      this.dataSourceFiltros.data.push(camposParaFiltros);
      this.snotifyService.warning("data sourches ", JSON.stringify(camposParaFiltros));
      console.log('data sources ', JSON.stringify(camposParaFiltros));

    })
*/
    this.camposParaFieldsFilter.forEach(campos => {
      campos.selecionado = false;
    })

    cadrelpadCabModel.cadrelpadCamposModelLista.forEach(ordem => {

      let index: number = this.camposParaFieldsFilter.findIndex(x => x.apelido == ordem.tfpcNomeCampo);
      if (index > -1) {
        this.camposParaFieldsFilter[index].selecionado = true;
        this.camposParaFieldsFilter[index].position = ordem.tfpcOrdemLista;
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

      let index: number = this.camposParaOrdem.findIndex(x => x.apelido == ordem.tfpcNomeCampo);
      if (index > -1) {
        this.camposParaOrdem[index].existe = true;
        this.camposParaOrdem[index].decrescente = ordem.tfpcOrdemRelResultDesc == 0 ? true : false;
        this.camposParaOrdem[index].position = ordem.tfpcOrdemRelResult;
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

  fAtualizarBusca() {
    this.filterPaginator.page = 0;
    this.fBuscarTabelaBase();
  }


}
