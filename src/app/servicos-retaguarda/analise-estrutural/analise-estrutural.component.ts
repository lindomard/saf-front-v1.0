import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SessionService } from '@base-core/session/session.service';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { SnotifyService } from 'ng-snotify';
import { CamposParaFiltros, FilterFields, OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { GenericosService } from 'src/app/genericos/genericos.service';
import { VisualizarResultadosService } from 'src/app/visualizar-resultados/visualizar-resultados.service';
import { AnaliseEstruturalModel } from '../model/AnaliseEstruturalModel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { safeCall } from '@base-core/safe-call';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { cadreltabMapper } from 'src/app/dados-comuns/mapper/cadrelpad-mapper';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-analise-estrutural',
  templateUrl: './analise-estrutural.component.html',
  styleUrls: ['./analise-estrutural.component.scss']
})
export class AnaliseEstruturalComponent implements OnInit {

  constructor(
    private session: SessionService
    , private snotifyService: SnotifyService
    , private router: Router
    , private baixarArquivosService: BaixarArquivosService
    , public dialog: MatDialog
    , private genericosService: GenericosService



  ) { }


  private cadrelpadMapper = cadreltabMapper();
  selection = new SelectionModel<any>(false, []);

  isLoading = false;
  tipoAcaoName: String = "Analise Estrutural";
  mDisableGerar: boolean = false;

  tipoEvento: String = "Carregando dados...";

  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  pesquisarPorcampoParaFiltro: CamposParaFiltros = {};

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<AnaliseEstruturalModel>([]);
  displayedColumns: String[] = [];
  dataSourceTableFilpadCab: CadTableFilpadCabModel = {};
  captionColumns: fieldsProperties[] = []

  dataSourcecamposParaFiltrosList = new MatTableDataSource<CamposParaFiltros>([]);

  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;

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
    this.router.navigate(['/page/retaguardaVisualizar']);

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



  fBuscarTableFilpad() {



    this.showLoading();
    this.tipoEvento = "Carregando dados...";


    this.filtrosGenericosLista = [];




    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rmcIdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;




    this.genericosService.buscarDadosGenericos("analiseEstruturalCamposParaFiltrosCustomizados"
      , parametrosDados)
      .subscribe((Response) => {

        safeCall(Response, () => {
          if (Response.success) {

            //            console.log('chegou 761 ',JSON.stringify(Response));

            this.dataSourceTableFilpadCab = Response.objeto.cadTableFilpadCabResponseModel;
            //            this.dataSourceTableFilpadCabRelatorio = 
            //this.cadrelpadMapper.converterCabTableModelToModel(this.dataSourceTableFilpadCab);


            //            this.dataSourceTableFilpadCabRelatorio = this.cadrelpadMapper.converterCamposModelToModel ()


            this.fAtualizarTable(this.dataSourceTableFilpadCab);
            //this.fAtualizarFiltros(this.dataSourceTableFilpadCab);

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

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
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
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rmcIdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "Resultados"
    parametrosDados.orderFields = this.fPegarOrderFieldsLista(this.dataSourceTableFilpadCab.cadTableFilpadCampos);

    // inicio

    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;

    // termino




    this.genericosService.buscarDadosGenericos("analiseEstruturalGet", parametrosDados)
      .subscribe((Response) => {

        safeCall(Response, () => {
          if (Response.success) {

            console.log('captions columns ', JSON.stringify(this.captionColumns) )
            console.log('display columns ', JSON.stringify(this.displayedColumns) )

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

  resetarConfiguracoes() {
    this.fBuscarTableFilpad();
  }

  // inicio relatorio


  baixarRelatorio() {


    this.showLoading();
    this.tipoEvento = "Gerando Relatorio...";

    this.mDisableGerar = false;
    this.filtrosGenericosLista = [];
    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rmcIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    //    this.fAdicionarFiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "analiseEstruturalRelatorio"
    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos);



    // inicio

    parametrosDados.filterFields = this.fPegarFiltrosCampos(this.dataSourceTableFilpadCab.cadTableFilpadCampos);
    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "analiseEstruturalRelatorio";

    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    // termino





  }


  fBuscarPlanilha() {



    this.tipoEvento = "Gerando Planilha...";

    this.mDisableGerar = false;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rmdIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    //    this.fAdicionarFiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "analiseEstruturalPlanilha"

    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos);



    // inicio

    parametrosDados.filterFields = this.fPegarFiltrosCampos(this.dataSourceTableFilpadCab.cadTableFilpadCampos);


    // termino


    this.baixarArquivosService.buscarDadosPostGenerico(parametrosDados, "analiseEstruturalPlanilha")
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
      BaixarArquivosService.terminouDownload.emit(false)

    });





  }

  // termino


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

  fAjustarDisplayColumnsTable() {

    this.fAtualizarTable(this.dataSourceTableFilpadCab);
    this.fBuscarTabelaBase();

  }


  fAtualizarTable(cadTableFilpadCab: CadTableFilpadCabModel) {

    let cadTableFilpadCamposLista: CadTableFilpadCamposModel[] = this.cadrelpadMapper.converterCadTableCamposModelToModel(cadTableFilpadCab.cadTableFilpadCampos);

/*
    cadTableFilpadCamposLista.forEach(camposTable => {
      camposTable.selecionado = camposTable.tfpcOrdemLista > 0;
    }
    )



    cadTableFilpadCamposLista = cadTableFilpadCamposLista.sort((a, b) =>
      (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemLista - b.tfpcOrdemLista
    );

    */
    
        // lista inicio
        cadTableFilpadCamposLista = cadTableFilpadCamposLista.filter(it =>
          it.tfpcOrdemLista > 0
        )
    
        cadTableFilpadCamposLista = cadTableFilpadCamposLista.sort((a, b) => a.tfpcOrdemLista - b.tfpcOrdemLista);
    
        // lista termino
    
    
        // INICIO  pesquisar por 
    
        /*
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
        
        //  this.camposConsultaPor = camposConsultaPorNew;
        
          */


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

  keydown(event) {

  }
  paginaProxima() {

    this.paginatorPageSize.pageIndex = this.paginatorPageSize.pageIndex +
      ((this.paginatorPageSize.pageIndex + 1) < this.filterPaginator.totalPages ? 1 : 0);
    this.changeEvent();

  }
  paginaAnterior() {
    this.paginatorPageSize.pageIndex--;
    this.changeEvent();
  }

  paginaUltima() {
    this.paginatorPageSize.pageIndex = this.filterPaginator.totalPages - 1;
    this.changeEvent();

  }
  paginaPrimeira() {

    this.paginatorPageSize.pageIndex = 0;
    this.changeEvent();

  }

  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

    this.fBuscarTabelaBase();
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


  fValorENomeDoCampoParaformatar(pValor: AnaliseEstruturalModel, pNomeCampo: string) {



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


  getStyle3(any) {
    let index: number = this.displayedColumns.indexOf(any);
    if (index < 0) {
      console.log('campo nao encontrado ', any)
      return 3
    } else {
      let mTamanho: number = this.captionColumns[index].weight;
      return ' ' + mTamanho + '% ';
    }
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


}
