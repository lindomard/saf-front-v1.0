import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SessionService } from '@base-core/session/session.service';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { SnotifyService } from 'ng-snotify';
import { Cadrc170Model } from '../../model/Cadrc170Model';
import { MatTableDataSource } from '@angular/material/table';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { CamposParaFiltros, FilterFields, OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { fConverterPerc595, fPegarFiltroId, getCondicoesTodasArray, getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { CamposParaOrdem } from 'src/app/dados-comuns/model/CamposParaOrdem';
import { FieldsFilter } from 'src/app/dados-comuns/model/FieldsFilter';
import { VisualizarResultadosService } from '../../visualizar-resultados.service';
import { fieldsProperties } from '../../resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { DadosParaComboboxModel } from '@base-core/model/dados-para-combobox-model';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { MatDialog } from '@angular/material/dialog';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { SaltarRelatorioPadraoModalComponent } from 'src/app/dados-comuns/salvar-relatorio-padrao/saltar-relatorio-padrao-modal/saltar-relatorio-padrao-modal.component';
import { CamposTabela } from 'src/app/dados-comuns/model/CamposTabela';
import { GenericosService } from 'src/app/genericos/genericos.service';
import { CadrelpadCamposModel } from 'src/app/genericos/model/CadrelpadCamposModel';
import { ConsultasERelatoriosComponent } from 'src/app/dados-comuns/consultas-e-relatorios/consultas-e-relatorios.component';
import { CadreltabCabModel } from 'src/app/genericos/model/CadrelpadCabModel';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { cadreltabMapper } from 'src/app/dados-comuns/mapper/cadrelpad-mapper';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'app-cadrc170-get',
  templateUrl: './cadrc170-get.component.html',
  styleUrls: ['./cadrc170-get.component.scss']
})
export class Cadrc170GetComponent implements OnInit {

  // dos filtros inicio

  camposConsultaPor: CadTableFilpadCamposModel[] = [];
//  focused: any;

  //  dataSourceTableFilpadCampos = new MatTableDataSource<CadTableFilpadCamposModel>([]);
  //dataSourceTableFilpadOrdemResult = new MatTableDataSource<CadTableFilpadCamposModel>([]);

  dataSourceTableFilpadCab: CadTableFilpadCabModel = {};

  private cadrelpadMapper = cadreltabMapper();

  //CadTableFilpadCamposModel[] = [];

  // dos filtros termino


  isLoading = false;
  mDisableGerar: boolean = false;

  tipoAcaoName: String = "Resultados dos Processamentos";

  tipoEvento: String = "Carregando dados...";

  condicaoString = getCondicoesTodasArray();


  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;
  //  @ViewChild('instanceConsultasERelatorios', { static: true }) instanceConsultasERelatorios: ConsultasERelatoriosComponent;

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<Cadrc170Model>([]);

  // cadTableFilpadCa
  bModel: CadTableFilpadCabModel = {};

  filtrosGenericosLista: FiltrosGenericosModel[] = [];
  pesquisarPorcampoParaFiltro: CamposParaFiltros = {};
  //  dataSourceOrdem = new MatTableDataSource<CamposParaOrdem>([]);


  //  dataSourceFilpadRelCampos = new MatTableDataSource<CadTableFilpadCamposModel>([]);

  // dataSourceFilpadRelOrdemResult = new MatTableDataSource<CadTableFilpadCamposModel>([]);

  //  dataSourceCadTableFidlpadCamposFiltrosExtras = new MatTableDataSource<CadTableFilpadCamposModel>([]);

  dataSourcecamposParaFiltrosList = new MatTableDataSource<CamposParaFiltros>([]);




  camposDaTabela: CamposTabela[] = [];

  dataSourceFiltros = new MatTableDataSource<CamposParaFiltros>([]);
  tipoRelacionarCondicao = getRelacionarCondicao();

  // inicio

  displayedColumns: String[] = [];

  /*
    displayedColumns: String[] = ['rc170Id', 'rc170ChvNfe'
      , 'rc170CodItem', 'rc170CodItemOriginal', 'rc170Qtd', 'rc170QtdOriginal', 'rc170VlItem', 'rc170Cfop'
      , 'rc170IndEmit', 'rc170CodSit', 'rc170DtMov', 'rc170Evalido',
      'rc170Origem'
  
  
    ]
  
  
  */


  captionColumns: fieldsProperties[] = []

  // termino

//  public selection: SelectionModel<Cadrc170Model>;
  selection = new SelectionModel<any>(false, []);
  constructor(
    private session: SessionService
    , private snotifyService: SnotifyService
    , private router: Router
    , private baixarArquivosService: BaixarArquivosService
    , private visualizarResultadosService: VisualizarResultadosService
    , public dialog: MatDialog
    , private genericosService: GenericosService


  ) { }

  ngOnInit(): void {

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 5;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.fBuscarTableFilpad();



    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.mDisableGerar = false;
        this.tipoEvento = "Aguardando....";
        this.hideLoading();

      }
    })


  }


  cancelarESair() {
    this.router.navigate(['/page/home']);

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

  fPegarFiltrosCampos(cadTableFilpadCamposModelLista: CadTableFilpadCamposModel[]): FilterFields[] {

    let filterFieldsLista: FilterFields[] = [];
    cadTableFilpadCamposModelLista.forEach(fields => {
      if (fields.selecionado) {
        let filterFields: FilterFields = {};
        filterFields.fieldApelido = fields.tfpcNomeCampo;
        filterFields.tamanho = fields.tfpcTamanhoPerc;
        if (fields.tfpcDescricaoCustom != fields.tfpcDescricaoOri) {
          filterFields.fieldDescricao = fields.tfpcDescricaoCustom;
        }
        filterFields.aliqn = fields.tfpcAlign;
        filterFieldsLista.push(filterFields)

      }
    })
    return filterFieldsLista;

  }



  fPegarOrderFieldsLista(cadTableFilpadCamposModel: CadTableFilpadCamposModel[]): OrderFields[] {

    let orderFieldsLista: OrderFields[] = [];



    let dataSourceFilpadRelCamposOrdemResult: CadTableFilpadCamposModel[] =
      cadTableFilpadCamposModel.filter(it =>
        it.tfpcOrdemResCons > 0)


    dataSourceFilpadRelCamposOrdemResult.sort((a, b) => a.tfpcOrdemResCons - b.tfpcOrdemResCons);




    dataSourceFilpadRelCamposOrdemResult.forEach(ordem => {
      if (ordem.selecionado) {
        let orderFields: OrderFields = {};
        orderFields.fieldApelido = ordem.tfpcNomeCampo;
        orderFields.descending = ordem.tfpcOrdemResConsDesc == true ? 1 : 0;
        orderFieldsLista.push(orderFields)

      }
    })

    return orderFieldsLista;
  }

  fPegarOrderFieldsRelatorio(cadTableFilpadCamposModel: CadTableFilpadCamposModel[]): OrderFields[] {

    let orderFieldsLista: OrderFields[] = [];



    let dataSourceFilpadRelCamposOrdemResult: CadTableFilpadCamposModel[] =
      cadTableFilpadCamposModel.filter(it =>
        it.tfpcOrdemRelResult > 0)


    dataSourceFilpadRelCamposOrdemResult.sort((a, b) => a.tfpcOrdemRelResult - b.tfpcOrdemRelResult);




    dataSourceFilpadRelCamposOrdemResult.forEach(ordem => {
      //      if (ordem.selecionado) {
      let orderFields: OrderFields = {};
      orderFields.fieldApelido = ordem.tfpcNomeCampo;
      orderFields.descending = ordem.tfpcOrdemRelResultDesc == true ? 1 : 0;
      orderFieldsLista.push(orderFields)

      //      }
    })

    return orderFieldsLista;
  }


  fBuscarTabelaBase() {



    this.showLoading();
    this.tipoEvento = "Carregando dados...";


    this.filtrosGenericosLista = [];



    safeCall(this.pesquisarPorcampoParaFiltro.valor, () => {


      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, this.pesquisarPorcampoParaFiltro.nomeDoCampo,
          this.pesquisarPorcampoParaFiltro.condicao, this.pesquisarPorcampoParaFiltro.valor,
          1, getRelacionarCondicao()[0].id).adicionarfiltros();



    })


    this.dataSourcecamposParaFiltrosList.data.forEach(filtro => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, filtro.nomeDoCampo,
          filtro.condicao, filtro.valor, filtro.grupoFiltro, filtro.relacionarCondicao).adicionarfiltros();


    })

    //    this.fAdicionarFiltros();

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "Resultados"
    parametrosDados.orderFields = this.fPegarOrderFieldsLista(this.dataSourceTableFilpadCab.cadTableFilpadCampos);

    // inicio

    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;

    // termino




    this.genericosService.buscarDadosGenericos("cadrc170ConsultaGet", parametrosDados)
      .subscribe((Response) => {

        safeCall(Response, () => {
          if (Response.success) {


            this.dataSourceWithPageSize.data = [...Response.objeto.content];
            if (this.dataSourceWithPageSize.data.length < 1) {

            } else {
              this.selection.select(this.dataSourceWithPageSize.data[0]);
            }

            //            this.snotifyService.info("menos que 1 [" + this.dataSourceWithPageSize.data.length);


            this.filterPaginator.totalElements = Response.objeto.totalElements;
            this.filterPaginator.totalPages = Response.objeto.totalPages;
            this.filterPaginator.size = Response.objeto.pageable.pageSize;
            this.filterPaginator.page = Response.objeto.pageable.pageNumber;




            this.tipoEvento = "Aguardando....";

          } else {

            this.snotifyService.error(Response.error);
          }


        })
        this.hideLoading();

      }, error => {

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
        this.hideLoading();
      }
      )


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


  fValorENomeDoCampoParaformatar(pValor: Cadrc170Model, pNomeCampo: string) {



    //    console.log('procurando ', pNomeCampo +" VALOR " +pValor[pNomeCampo] );
    //  console.log('pvalor ', JSON.stringify(pValor));
    let mValor: String = "";

    let mNomeCampoTemp: string = pNomeCampo;
    let pValorTemp = pValor;

    while (mNomeCampoTemp.indexOf(".") > 0) {
      let mNome = mNomeCampoTemp.substring(0, mNomeCampoTemp.indexOf("."));
      //      console.log("nome dentro a retirar " + mNome);
      mNomeCampoTemp = mNomeCampoTemp.replace(mNome + ".", "");
      //    console.log('DESCRICAO ITEM  ', pValorTemp[mNome]);
      pValorTemp = pValorTemp[mNome];
    }


    mValor = pValorTemp[mNomeCampoTemp];
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: String = this.captionColumns[mIndex].mask;


      return this.fRetornaFormatado(mValor, mTipoCampo);
    } else {
      console.log('nao encontrado no index ', pNomeCampo)
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


  baixarRelatorio() {


    this.showLoading();
    //    this.snotifyService.warning("vai baixar relatorio");
    this.tipoEvento = "Gerando Relatorio...";

    this.mDisableGerar = false;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    //    this.fAdicionarFiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadprocexecRelatorio"
    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos);



    // inicio

    parametrosDados.filterFields = this.fPegarFiltrosCampos(this.dataSourceTableFilpadCab.cadTableFilpadCampos);
    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "cadrc170ConsultaRelatorio";

    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    // termino





  }


  fBuscarPlanilha() {



    this.tipoEvento = "Gerando Planilha...";

    this.mDisableGerar = false;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    //    this.fAdicionarFiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadrc170ConsultasGetPlanilha"

    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos);



    // inicio

    parametrosDados.filterFields = this.fPegarFiltrosCampos(this.dataSourceTableFilpadCab.cadTableFilpadCampos);


    // termino




    this.baixarArquivosService.buscarDadosPostGenerico(parametrosDados, "cadrc170ConsultaPlanilha")
      .subscribe((nomeDoArquivoGeradoModelLista) => {
        safeCall(nomeDoArquivoGeradoModelLista, () => {
          if (nomeDoArquivoGeradoModelLista.success) {

            this.baixarPlanilhas(nomeDoArquivoGeradoModelLista.objeto);
          } else {
            this.snotifyService.error(nomeDoArquivoGeradoModelLista.error);
          }


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
      BaixarArquivosService.terminouDownload.emit(true)

    });





  }

  /*
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
*/
  /*
    fSalvarRelatorioPadrao(pNomeRel: String) {
  
      let cadrelpadCabModel: CadreltabCabModel = {};
      cadrelpadCabModel.tfpcForm = "resultados";
      cadrelpadCabModel.tfpcIdPessoa = parseInt(this.session.companyId);
      cadrelpadCabModel.tfpcNome = pNomeRel;
  
      let cadrelpadOrderFieldsModelLista: CadrelpadCamposModel[] = [];
      let cadrelpadFiltrarModelLista: CadrelpadFiltrarModel[] = [];
      let cadrelpadOrdemResultModelLista: CadrelpadCamposModel[] = [];
  
  
      let mOrdem: number = 0;
      this.dataSourceFilpadRelCampos.data.forEach(fields => {
        if (fields.selecionado) {
  
          let cadrelpadOrderFieldsModel: CadrelpadCamposModel = {};
          mOrdem++;
  
          cadrelpadOrderFieldsModel.tfpcNomeCampo = fields.tfpcNomeCampo;
          cadrelpadOrderFieldsModel.tfpcOrdemLista = mOrdem;
          cadrelpadOrderFieldsModelLista.push(cadrelpadOrderFieldsModel);
  
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
  
  
      })
  
  
      cadrelpadCabModel.cadrelpadFiltrarModelLista = cadrelpadFiltrarModelLista;
      //    cadrelpadCabModel.cadrelpadOrderFields = cadrelpadOrderFieldsModelLista;
      //    cadrelpadCabModel.cadrelpadOrdemResult = cadrelpadOrdemResultModelLista;
  
  
  
  
  
  
  
  
  
      try {
  
        this.showLoading();
  
  
  
        this.visualizarResultadosService.salvarTabelasPadrao(cadrelpadCabModel).subscribe((Response) => {
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
  */
  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }



  /*
  fBuscarCadRelPad() {


    this.showLoading();


    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "tfpcIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();

    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    let orderFieldsLista: OrderFields[] = [];
    /*
    
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
      this.visualizarResultadosService.buscarTabelasPadrao(parametrosDados)
        .subscribe((DadosParaComboboxModelLista) => {
          safeCall(DadosParaComboboxModelLista, () => {
  
  
  
  
            this.tipoEvento = "Aguardando....";
            /*
            let dadosParaComboboxModel: DadosParaComboboxModel = {};
            this.mRelatoriosSalvos = DadosParaComboboxModelLista;
            this.mRelatoriosSalvos.push(dadosParaComboboxModel);
  */
  /*        this.hideLoading();


        })
      }, error => {
        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
        this.hideLoading();
      }
      )


  }


  fBuscarRelatorioPadrao(idRel: number) {

  }
*/
  getStyle3(any) {
    let index: number = this.displayedColumns.indexOf(any);
    if (index < 0) {
      console.log('campo nao encontrado ', any)
      return 3
    } else {
      //      let mTamanho: number = fConverterPerc595(this.captionColumns[index].weight);
      let mTamanho: number = this.captionColumns[index].weight;
      /*
      console.log('campo ',this.captionColumns[index].name,' tamanho pixel ',
      this.captionColumns[index].weight, ' convertido % ' , mTamanho);
      */
      return ' ' + mTamanho + '% ';
    }
  }



  // buscar dados das configurações das consultas

  fBuscarTableFilpad() {



    this.showLoading();
    this.tipoEvento = "Carregando dados...";


    this.filtrosGenericosLista = [];




    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;




    this.genericosService.buscarDadosGenericos("cadrc170ConsultaCamposParaFiltrosCustomizados"
      , parametrosDados)
      .subscribe((Response) => {

        safeCall(Response, () => {
          if (Response.success) {

            //            console.log('chegou 761 ',JSON.stringify(Response));

            this.dataSourceTableFilpadCab = Response.objeto.cadTableFilpadCabResponseModel;
            //            this.dataSourceTableFilpadCabRelatorio = 
            //this.cadrelpadMapper.converterCabTableModelToModel(this.dataSourceTableFilpadCab);


            //            this.dataSourceTableFilpadCabRelatorio = this.cadrelpadMapper.converterCamposModelToModel ()

            this.fAtualizarFiltros(this.dataSourceTableFilpadCab);

            this.fBuscarTabelaBase();
            this.tipoEvento = "Aguardando....";

          } else {

            this.snotifyService.error(Response.error);
          }


        })
        this.hideLoading();

      }, error => {

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
        this.hideLoading();
      }
      )


  }

  fAtualizarTable(cadTableFilpadCab: CadTableFilpadCabModel) {

    let cadTableFilpadCamposLista: CadTableFilpadCamposModel[] = this.cadrelpadMapper.converterCadTableCamposModelToModel(cadTableFilpadCab.cadTableFilpadCampos);


    cadTableFilpadCamposLista.forEach(camposTable => {
      camposTable.selecionado = camposTable.tfpcOrdemLista > 0;
    }
    )



    cadTableFilpadCamposLista = cadTableFilpadCamposLista.sort((a, b) =>
      (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemLista - b.tfpcOrdemLista
    );



    // lista inicio
    cadTableFilpadCamposLista = cadTableFilpadCamposLista.filter(it =>
      it.tfpcOrdemLista > 0
    )

    cadTableFilpadCamposLista.sort((a, b) => a.tfpcOrdemLista - b.tfpcOrdemLista);

    // lista termino


    // INICIO  pesquisar por 


    let camposConsultaPorNew: CadTableFilpadCamposModel[] =
      this.cadrelpadMapper.converterCadTableCamposModelToModel(cadTableFilpadCab.cadTableFilpadCampos);


    camposConsultaPorNew = camposConsultaPorNew.filter(it =>
      it.tfpcOrdemPesqpor > 0
    )

    camposConsultaPorNew.forEach(camposTable => {
      camposTable.selecionado = true;
    }
    )







    camposConsultaPorNew.sort((a, b) => a.tfpcOrdemPesqpor - b.tfpcOrdemPesqpor);

    this.camposConsultaPor = camposConsultaPorNew;

    // camposConsultaPorNew.forEach(conspor => {
    //   if (conspor.selecionado == true) {
    //     console.log('consultar por ', conspor.tfpcNomeCampo)
    //   }
    // })
    // termino pesquisar por



    this.captionColumns = [];
    this.displayedColumns = [];
    cadTableFilpadCamposLista.forEach(campos => {

      this.displayedColumns.push(campos.tfpcNomeCampo)
      let filtrosFields: fieldsProperties = {};
      filtrosFields.caption = campos.tfpcDescricaoCustom;
      filtrosFields.weight = campos.tfpcTamanhoPerc ? campos.tfpcTamanhoPerc : 2;
      filtrosFields.mask = campos.tfpcMask;
      switch (campos.tfpcAlign) {
        case "D": {
          filtrosFields.align = "right";
          break;
        }
        case "C": {
          filtrosFields.align = "center";
          break;
        }

        default: {
          filtrosFields.align = "left";
          break;
        }
      }


      filtrosFields.name = campos.tfpcNomeCampo;
      this.captionColumns.push(filtrosFields);
    })




  }

  fAtualizarFiltros(cadTableFilpadCabModelPar: CadTableFilpadCabModel) {
    //        console.log('passou 752 ',JSON.stringify(this.cadTableFilpadCabModel))
    //    this.camposConsultaPor = cadTableFilpadCabModel.cadTableFilpadCampos;
    // inicio table 
    this.fAtualizarTable(cadTableFilpadCabModelPar);

    //  cadTableFilpadCabModelPar.cadTableFilpadCampos);

    // termino table

    //    lindomar




    //    this.instanceConsultasERelatorios.camposConsultaPor = this.camposConsultaPor;

    //    this.instanceConsultasERelatorios.atualizarFiltrosCampos();

    // fields properties inicio


    //    this.displayedColumns = []




    // this.dataSourceFilpadRelCampos.data = this.mapperCampos(cadTableFilpadCabModelPar.cadTableFilpadCampos);





    /*
        this.dataSourceFilpadRelCampos.data.forEach(camposRel => {
          if (camposRel.tfpcOrdemRel > 0) {
            camposRel.selecionado = true;
          }
        })
    
        this.dataSourceFilpadRelCampos.data = this.dataSourceFilpadRelCampos.data.sort((a, b) =>
          (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemRel - b.tfpcOrdemRel
        );
    
    
        this.dataSourceFilpadRelOrdemResult.data = this.mapperCampos(cadTableFilpadCabModelPar.cadTableFilpadCampos);
    
    
    
        this.dataSourceFilpadRelOrdemResult.data.forEach(camposRel => {
          if (camposRel.tfpcOrdemRelResult > 0) {
            camposRel.selecionado = true;
          }
        })
    
    
        this.dataSourceFilpadRelOrdemResult.data = this.dataSourceFilpadRelOrdemResult.data.sort((a, b) =>
          (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemRelResult - b.tfpcOrdemRelResult
          || String(a.tfpcDescricaoCustom).localeCompare(String(b.tfpcDescricaoCustom))
        );
    */
    // filtros extras inicio

    //    this.dataSourceCadTableFidlpadCamposFiltrosExtras.data = this.mapperCampos(cadTableFilpadCabModelPar.cadTableFilpadCampos);

    //console.log('campos que ira ser dados extras ', this.dataSourceCadTableFidlpadCamposFiltrosExtras.data.length,
    //' valor do zero ', JSON.stringify(this.dataSourceCadTableFidlpadCamposFiltrosExtras.data[0]) );
    // dataSourceCadTableFidlpadCamposFiltrosExtras = new MatTableDataSource<CadTableFilpadCamposModel>([]);

    // filtros extras termino


    /*    this.dataSourceFilpadRelOrdemResult.data = this.dataSourceFilpadRelOrdemResult.data.sort((a, b) =>
        String(a.tfpcDescricaoOri).localeCompare(String(b.tfpcDescricaoOri)));
    */

    // ordem result relatorios



    // termino




    //    console.log('display column ' + JSON.stringify(this.captionColumns))
    // fields properties termino





    //valorInicial    

    //    console.log('passou aqui ',JSON.stringify(this.camposConsultaPor))



  }


  //  cloneObj() {
  //  console.log('display columns ', this.displayedColumns.length, ' caption columns ', this.captionColumns.length
  //      , ' quantidade registros ', this.dataSourceWithPageSize.data.length)


  /*
  const userDetails = {
    name: "John Doe",
    age: 14,
    verified: false
  };

  // Cloning the Object with Object.assign() Method
  let cloneUser = Object.assign({}, userDetails);
  cloneUser.name = "alterado";
  let cloneUser2 = Object.assign({}, userDetails);


  console.log('clone 1 ', JSON.stringify(cloneUser)); // {name: 'John Doe', age: 14, verified: false}
  console.log('clone 2 ', JSON.stringify(cloneUser2)); // {name: 'John Doe', age: 14, verified: false}

  console.log('original ', JSON.stringify(userDetails)); // {name: 'John Doe', age: 14, verified: false}
*/

  //}
  /*
  
    private mapperCampos(cadTableFilpadCamposModelLista: CadTableFilpadCamposModel[]): CadTableFilpadCamposModel[] {
      //  const files = imagesRegisterEntity.filter(o => o.id == null);
      return cadTableFilpadCamposModelLista.map(campos => {
        return {
  
  
  
          tfpcOrdemRelResult: campos.tfpcOrdemRelResult,
          tfpcOrdemRelResultDesc: campos.tfpcOrdemRelResultDesc,
          tfpcTamanho: campos.tfpcTamanho,
          tfpcQtddec: campos.tfpcQtddec,
          tfpcTipoCampo: campos.tfpcTipoCampo,
          tfpcOrdemResConsDesc: campos.tfpcOrdemResConsDesc,
          tfpcOrdemLista: campos.tfpcOrdemLista,
          tfpcMask: campos.tfpcMask,
          tfpcId: campos.tfpcId,
          tfpcIdCab: campos.tfpcIdCab,
          tfpcOrdemResCons: campos.tfpcOrdemResCons,
          tfpcOrdemRel: campos.tfpcOrdemRel,
          tfpcTamanhoPercFixo: campos.tfpcTamanhoPercFixo,
          tfpcAlign: campos.tfpcAlign,
          tfpcOrdemPesqpor: campos.tfpcOrdemPesqpor,
          tfpcDescricaoCustom: campos.tfpcDescricaoCustom,
          tfpcDescricaoOri: campos.tfpcDescricaoOri,
          tfpcTamanhoPerc: campos.tfpcTamanhoPerc,
          tfpcNomeCampo: campos.tfpcNomeCampo,
          tfpcOrdem: campos.tfpcOrdem,
          selecionado: campos.selecionado == undefined ? false : campos.selecionado
  
        }
      });
    }
  
  */
  fAjustarDisplayColumnsTable() {

    this.fAtualizarTable(this.dataSourceTableFilpadCab);
    this.fBuscarTabelaBase();
    //  console.log('atualizando os tables  qtd reg ', this.dataSourceTableFilpadCampos.data.length)
  }

  resetarConfiguracoes() {
    console.log(' evento 1095 ')
    this.fBuscarTableFilpad();
  }

  keydown(event) {
    
  }
  paginaProxima() {
    
    this.paginatorPageSize.pageIndex  = this.paginatorPageSize.pageIndex +
    ( (this.paginatorPageSize.pageIndex+1) < this.filterPaginator.totalPages ? 1 : 0); 
    this.changeEvent();

  }
  paginaAnterior() {
      this.paginatorPageSize.pageIndex --; 
      this.changeEvent();
  }

  paginaUltima() {
    this.paginatorPageSize.pageIndex = this.filterPaginator.totalPages-1;
    this.changeEvent();

  }
  paginaPrimeira() {

      this.paginatorPageSize.pageIndex=0; 
      this.changeEvent();

//      this.filterPaginator.page = this.paginatorPageSize.pageIndex;
  //    this.filterPaginator.size = this.paginatorPageSize.pageSize;
  
  }

}
