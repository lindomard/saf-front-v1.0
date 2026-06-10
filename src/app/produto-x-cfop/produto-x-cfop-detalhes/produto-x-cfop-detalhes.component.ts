import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { safeCall } from '@base-core/safe-call';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { SessionService } from '@base-core/session/session.service';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { SnotifyService } from 'ng-snotify';
import { SimpleModalService } from 'ngx-simple-modal';
import { FileViwerComponent } from 'src/app/components/components/file-viwer/file-viwer.component';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { MovimentoProdServModel } from 'src/app/retaguarda-visualizar-resultados/model/MovimentoProdServModel';
import { RetaguardaVisualizarResultadosService } from 'src/app/retaguarda-visualizar-resultados/retaguarda-visualizar-resultados.service';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-produto-x-cfop-detalhes',
  templateUrl: './produto-x-cfop-detalhes.component.html',
  styleUrls: ['./produto-x-cfop-detalhes.component.scss']
})
export class ProdutoXCfopDetalhesComponent implements OnInit {


  isLoading = false;

  tipoAcaoName: string = "";
  tipoEvento: string = "";

  titulo: string = "Movimento dos Produtos";
  selection = new SelectionModel<any>(false, []);

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<MovimentoProdServModel>([]);
  filtrosGenericosLista: FiltrosGenericosModel[] = [];


  @ViewChild(MatPaginator) paginatorPageSize!: MatPaginator;
  displayedColumns: string[] =
    ['origem', 'rc170CodItem', 'r0200DescrItem', 'r0200UnidInv', 'rc170Qtd', 'rc170VlItem'

      , 'rc170DtMov', 'rc170ChvNfe', 'rc170CodSit', 'rc170Cfop', 'visualizar'];




  captionColumns: fieldsProperties[] = [
    { caption: 'Origem', weight: 10, mask: '', align: 'left', name: 'origem' },
    { caption: 'Código Item', weight: 10, mask: '', align: 'left', name: 'rc170CodItem' },
    { caption: 'Descrição', weight: 15, mask: '', align: 'center', name: 'r0200DescrItem' },
    { caption: 'Und', weight: 2, mask: '', align: 'center', name: 'r0200UnidInv' },
    { caption: 'Quantidade', weight: 7, mask: 'valor3dec', align: 'right', name: 'rc170Qtd' },
    { caption: 'Total do Item', weight: 7, mask: 'valor2dec', align: 'right', name: 'rc170VlItem' },
    { caption: 'Data do Movimento', weight: 7, mask: 'date', align: 'center', name: 'rc170DtMov' },
    { caption: 'Chave de Acesso', weight: 7, mask: '', align: 'center', name: 'rc170ChvNfe' },
    { caption: 'Cód Sit', weight: 2, mask: '', align: 'center', name: 'rc170CodSit' },
    { caption: 'Cód Cfop', weight: 2, mask: '', align: 'center', name: 'rc170Cfop' },
    { caption: 'Visualizar', weight: 2, mask: '', align: 'center', name: 'visualizar' },

  ]



  constructor(
    public dialogRef: MatDialogRef<ProdutoXCfopDetalhesComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private session: SessionService,
    private retaguardaVisualizarResultadosService: RetaguardaVisualizarResultadosService,
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

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    //    this.snotifyService.info("Entrou no prouduto x cfop");
    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.isLoading = false;
        this.tipoEvento = "Aguardando....";

      }
    })



    this.fBuscarTabelaBase();



  }


  cancelarESair() {
    this.dialogRef.close();
  }


  getAlingn(pNomeCampo) {
    //    console.log('chegou a vir no align')

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
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
    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return pNomeCampo
    } else {
      let mCaption: String = this.captionColumns[index].caption;

      return mCaption;
    }
  }


  fValorENomeDoCampoParaformatar(pValor: MovimentoProdServModel, pNomeCampo: string) {



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




  getStyle3(any) {
    let index: number = this.displayedColumns.indexOf(any);
    if (index < 0) {
      return 3
    } else {
      let mTamanho: number = this.captionColumns[index].weight;
      return ' ' + mTamanho + '% ';
    }
  }



  VisualizarDanfe(movimentoProdServModel: MovimentoProdServModel) {



    this.tipoEvento = "Carregando dados...";
    this.filtrosGenericosLista = [];
    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170ChvNfe", FuncoesGerais.Igual,
        movimentoProdServModel.rc170ChvNfe,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;

    this.retaguardaVisualizarResultadosService.VisualizarDanfePegarLink(parametrosDados)
      .subscribe((response) => {
        safeCall(response, () => {


          if (response.success) {

            this.AcionarView(response.objeto[0].nomeDoArquivoGerado)



          } else {
            this.snotifyService.error(response.error);
          }


          this.tipoEvento = "";



        })
      }, error => {

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "";
      }
      )


    //    let fileUrl = 'https://www.erpgenesisweb.com.br/file/2/202410/carne.jpg_1730384014075.jpg';




  }

  AcionarView(pLink: string) {
    //  let fileUrl: string = "http://localhost:8080/file/xml_not_found.pdf";

    //const fileUrl: string = environment.url+ pLink.replace('static//', '');

    let fileUrl: string = pLink;
    //let fileUrl = 'https://www.erpgenesisweb.com.br/file/2/202410/carne.jpg_1730384014075.jpg';

    console.log('no view ' + pLink)
    fileUrl = fileUrl.includes('static//')
      ? environment.urlInicio + fileUrl.replace('static//', '')
      : fileUrl;



    const extension = fileUrl.split('.').pop()?.toLowerCase()

    console.log('link ', fileUrl)
    console.log('extensao ', extension)

    this.modalService.addModal(FileViwerComponent, {
      url: extension !== 'pdf'
        ? this.sanitizer.bypassSecurityTrustUrl(fileUrl)
        : fileUrl,
      extension,
      fromUrl: false
    });


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



  fBuscarTabelaBase() {



    console.log('chegou da tabela base')
    this.tipoEvento = "Carregando dados...";
    this.isLoading = true;
    this.filtrosGenericosLista = [];



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "cfop", FuncoesGerais.Igual,
        this.dados.cfop,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170CodItem", FuncoesGerais.Igual, this.dados.codItem,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();

    /*
    
        this.filtrosGenericosLista = new
          AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ano", FuncoesGerais.Igual, this.dados.ano,
            2, getRelacionarCondicao()[0].id).adicionarfiltros();
    
    
        this.filtrosGenericosLista = new
          AdicionarFiltrosGenericos(this.filtrosGenericosLista, "entsai", FuncoesGerais.Igual, this.dados.entsai,
            2, getRelacionarCondicao()[0].id).adicionarfiltros();
    
    */


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;


    // termino




    this.retaguardaVisualizarResultadosService.BuscarMovimentoProdServPage(parametrosDados)
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


  Editar(pValor) {
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
  async copyToClipboard(pValor: MovimentoProdServModel, pNomeCampo: string) {
    let mValor: string = "";

    try {

      mValor = pValor[pNomeCampo];
      let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
      if (mIndex > -1) {

        let mTipoCampo: String = this.captionColumns[mIndex].mask;


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



    this.tipoEvento = "Gerando Planilha...";

    this.isLoading = true;
    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        1, getRelacionarCondicao()[0].id).adicionarfiltros();
    //    this.fAdicionarFiltros();


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "cfop", FuncoesGerais.Igual,
        this.dados.cfop,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170CodItem", FuncoesGerais.Igual, this.dados.codItem,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "movimentoProdServPlanilha"





    this.baixarArquivosService.buscarDadosPostGenerico(parametrosDados, "movimentoProdServPlanilha")
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
  // termino planilha


}



