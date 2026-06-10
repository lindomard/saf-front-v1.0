import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { CadpcoUnitarioAnualModel } from '../model/CadpcoUnitarioAnualModel';
import { CadpcoUnitarioAnualInventarioModel } from '../model/CadpcoUnitarioAnualInventarioModel';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SessionService } from '@base-core/session/session.service';
import { RetaguardaVisualizarResultadosService } from 'src/app/retaguarda-visualizar-resultados/retaguarda-visualizar-resultados.service';
import { SimpleModalService } from 'ngx-simple-modal';
import { SnotifyService } from 'ng-snotify';
import { DomSanitizer } from '@angular/platform-browser';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { FilterFields, OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { safeCall } from '@base-core/safe-call';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { BaseSharedModule } from "@base-shared/base-shared.module";
import { CadpcoUnitarioAnualService } from '../cadpco-unitario-anual.service';

@Component({
  selector: 'app-cadpco-unitario-anual-inventario',
  templateUrl: './cadpco-unitario-anual-inventario.component.html',
  styleUrls: ['./cadpco-unitario-anual-inventario.component.scss']
})
export class CadpcoUnitarioAnualInventarioComponent implements OnInit, AfterViewInit {


  isLoading = false;

  tipoAcaoName: string = "";
  tipoEvento: string = "";

  titulo: string = "Preços Unitarios";
  selection = new SelectionModel<any>(false, []);

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<CadpcoUnitarioAnualInventarioModel>([]);
  filtrosGenericosLista: FiltrosGenericosModel[] = [];


  @ViewChild(MatPaginator) paginatorPageSize!: MatPaginator;
  displayedColumns: string[] =
    ['ipCodItem', 'cadr0200UnicoResumido.r0200DescrItem', 'cadr0200UnicoResumido.r0200UnidInv',
      'ipSaldoInicial', 'ipValorTotalInicial', 'ipPrecoUnitInicial'
      , 'ipSaldoFinal', 'ipValorTotalFinal', 'ipPrecoUnitFinal'];


  captionColumns: fieldsProperties[] = [
    { caption: 'Código Item', weight: 10, mask: '', align: 'left', name: 'ipCodItem' },
    { caption: 'Descrição', weight: 15, mask: '', align: 'center', name: 'cadr0200UnicoResumido.r0200DescrItem' },
    { caption: 'Unidade', weight: 2, mask: '', align: 'center', name: 'cadr0200UnicoResumido.r0200UnidInv' },

    { caption: 'Saldo Inicial', weight: 7, mask: 'valor3dec', align: 'right', name: 'ipSaldoInicial' },
    { caption: 'Valor Total Inicial', weight: 7, mask: 'valor2dec', align: 'right', name: 'ipValorTotalInicial' },
    { caption: 'Preço Unitário Inicial', weight: 7, mask: 'valor3dec', align: 'right', name: 'ipPrecoUnitInicial' },

    { caption: 'Saldo Final', weight: 7, mask: 'valor3dec', align: 'right', name: 'ipSaldoFinal' },
    { caption: 'Valor Total Final', weight: 7, mask: 'valor2dec', align: 'right', name: 'ipValorTotalFinal' },
    { caption: 'Preço Unitário Final', weight: 7, mask: 'valor3dec', align: 'right', name: 'ipPrecoUnitFinal' }

  ]

  constructor(
    public dialogRef: MatDialogRef<CadpcoUnitarioAnualInventarioComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private session: SessionService,
    private cadpcoUnitarioAnualService: CadpcoUnitarioAnualService,
    private modalService: SimpleModalService,
    private snotifyService: SnotifyService,
    private sanitizer: DomSanitizer,
    private baixarArquivosService: BaixarArquivosService

  ) { }

  ngOnInit(): void {

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 5;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;
    this.displayedColumns = this.dados.displayedColumns ? this.dados.displayedColumns : this.displayedColumns;
    this.titulo = this.dados.titulo ? this.dados.titulo : this.titulo;





    //    this.snotifyService.info("Entrou no prouduto x cfop");
    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.isLoading = false;
        this.tipoEvento = "Aguardando....";

      }
    })



    this.fBuscarTabelaBase();


  }

  ngAfterViewInit(): void {
    if (this.paginatorPageSize) {
      this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
    }
  }


  cancelarESair() {
    this.dialogRef.close();
  }


  getAlingn(pNomeCampo: any) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: any = this.captionColumns[index].align;
      if (mAlign === "right") {
        return "text-align:right";
      } else if (mAlign === "center") {
        return "text-align:center";
      } else
        return "text-align:left";

    }
  }

  public getColumnName(pNomeCampo: any) {
    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return pNomeCampo
    } else {
      let mCaption: any = this.captionColumns[index].caption;

      return mCaption;
    }
  }


  fValorENomeDoCampoParaformatar(pValor: CadpcoUnitarioAnualInventarioModel, pNomeCampo: string) {




    let mValor: String = "";

    let mNomeCampoTemp: string = pNomeCampo;
    let pValorTemp: any = pValor;

    while (mNomeCampoTemp.indexOf(".") > 0) {
      let mNome = mNomeCampoTemp.substring(0, mNomeCampoTemp.indexOf("."));
      mNomeCampoTemp = mNomeCampoTemp.replace(mNome + ".", "");
      pValorTemp = pValorTemp[mNome as keyof CadpcoUnitarioAnualInventarioModel];
    }


    mValor = pValorTemp[mNomeCampoTemp];
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: any = this.captionColumns[mIndex].mask;


      return this.fRetornaFormatado(mValor, mTipoCampo);
    } else {
      console.log('nao encontrado no index ', pNomeCampo)
    }


  }

  fRetornaFormatado(pValor: any, pDataMask: String) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }




  getStyle3(any: any) {
    let index: number = this.displayedColumns.indexOf(any);
    if (index < 0) {
      return 3
    } else {
      let mTamanho: number = this.captionColumns[index].weight ?? 0;
      return ' ' + mTamanho + '% ';
    }
  }



  paginaProxima() {
    if (!this.paginatorPageSize) {
      return;
    }

    this.paginatorPageSize.pageIndex = this.paginatorPageSize.pageIndex +
      (((this.paginatorPageSize.pageIndex + 1) < (this.filterPaginator.totalPages ?? 0)) ? 1 : 0);
    this.changeEvent();

  }
  paginaAnterior() {
    if (!this.paginatorPageSize) {
      return;
    }

    this.paginatorPageSize.pageIndex--;
    this.changeEvent();
  }

  paginaUltima() {
    if (!this.paginatorPageSize) {
      return;
    }

    this.paginatorPageSize.pageIndex = (this.filterPaginator.totalPages ?? 1) - 1;
    this.changeEvent();

  }
  paginaPrimeira() {
    if (!this.paginatorPageSize) {
      return;
    }

    this.paginatorPageSize.pageIndex = 0;
    this.changeEvent();
  }

  changeEvent() {
    if (!this.paginatorPageSize) {
      return;
    }

    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

    this.fBuscarTabelaBase();
  }



  fBuscarTabelaBase() {



    console.log('chegou da tabela base')
    this.tipoEvento = "Carregando dados...";
    this.isLoading = true;
    this.filtrosGenericosLista = [];



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ipIdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();





    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ipCodItem", FuncoesGerais.Igual, this.dados.codItem,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;


    // termino




    this.cadpcoUnitarioAnualService.BuscarResultadosPage(parametrosDados)
      .subscribe((response) => {
        safeCall(response, () => {


          if (response.success) {



            this.dataSourceWithPageSize.data = [...response.objeto.content];


            this.filterPaginator.page = response.objeto.pageable.pageNumber;
            this.filterPaginator.size = response.objeto.pageable.pageSize;
            this.filterPaginator.totalElements = response.objeto.totalElements;
            this.filterPaginator.totalPages = response.objeto.totalPages;

            if (this.dataSourceWithPageSize.data.length < 1) {

            } else {
              this.selection.select(this.dataSourceWithPageSize.data[0]);
            }


          } else {
            this.snotifyService.error(response.error);
          }


          this.tipoEvento = "";

          this.isLoading = false;

        })
      }, error => {

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "";
        this.isLoading = false;
      }
      )


  }


  Editar(pValor: any) {
    console.log('pvalor ', pValor)

  }
  /*
  fValorENomeDoCampoParaformatar(pValor: MovimentoProdServModel, pNomeCampo: string) {
  
  
  
  
      let mValor: String = "";
      mValor = pValor[pNomeCampo];
      */
  /*  
  async copyToClipboard(text: string) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Content copied!');
      } catch (err) {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers if needed
  //      this.fallbackCopyTextToClipboard(text);
      }
    }
  }
  
  */
  async copyToClipboard(pValor: CadpcoUnitarioAnualInventarioModel, pNomeCampo: string) {
    let mValor: any = "";

    try {

      mValor = pValor[pNomeCampo as keyof CadpcoUnitarioAnualInventarioModel];
      let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
      if (mIndex > -1) {

        let mTipoCampo: any = this.captionColumns[mIndex].mask;


        mValor = this.fRetornaFormatado(mValor, mTipoCampo);
      }



      try {
        await navigator.clipboard.writeText(mValor.toString());
        this.snotifyService.info(mValor + " copiado!");

      } catch (err) {
        this.snotifyService.warning('erro' + err + " ao copiar " + pNomeCampo);
      }

      //alert('Content copied!');
    } catch (err) {
      this.snotifyService.error(mValor + " Erro ao Copiar!")

      //       console.error('Failed to copy: ', err);
      // Fallback for older browsers if needed
      //      this.fallbackCopyTextToClipboard(text);
    }
  }


  // inicio planilha

  fBuscarPlanilha() {


    //    this.snotifyService.warning("vai baixar relatorio");
    this.tipoEvento = "Gerando Relatorio...";
    this.isLoading = true;

    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ipIdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    //    this.fAdicionarFiltros();


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "puaAno", FuncoesGerais.Igual,
        this.dados.ano,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ipCodItem", FuncoesGerais.Igual, this.dados.codItem,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadpcoUnitarioAnualInventarioPlanilha"


    let orderFieldsLista: OrderFields[] = [];

    let orderFields: OrderFields = {};
    orderFields.fieldApelido = "cadr0200UnicoResumido.r0200DescrItem";
    orderFields.descending = 1;
    orderFieldsLista.push(orderFields)

    parametrosDados.orderFields = orderFieldsLista;

    let filterFieldsList: FilterFields[] = [];


    this.displayedColumns.forEach(coluna => {
      let filterFields: FilterFields = {};
      filterFields.fieldApelido = coluna;
      filterFieldsList.push(filterFields);


    })

//    parametrosDados.filterFields = filterFieldsList;



/*


    let filterFieldsLista: FilterFields[] = [];

    this.fAdicionarFilterFieds(filterFieldsLista,"codItem")
    this.fAdicionarFilterFieds(filterFieldsLista,"cadr0200UnicoResumido.r0200DescrItem")
    this.fAdicionarFilterFieds(filterFieldsLista,"cadr0200UnicoResumido.r0200UnidInv")
    this.fAdicionarFilterFieds(filterFieldsLista,"cadr0200UnicoResumido.ipSaldoInicial")


    parametrosDados.filterFields = filterFieldsLista;
    */
    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "CSV";
    parametrosDados.origemRelatorio = "cadpcoUnitarioAnualInventarioPlanilha";

    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    // termino





  }
  fAdicionarFilterFieds(filterFieldsLista: FilterFields[], pNomefield: String): FilterFields[] {
    let filterFields: FilterFields = {};
    filterFields.fieldApelido = pNomefield;
    filterFieldsLista.push(filterFields)
    return filterFieldsLista

  }


  // termino planilha


}



