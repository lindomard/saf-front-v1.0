import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { MovimentoProdServModel } from '../model/MovimentoProdServModel';
import { MatTableDataSource } from '@angular/material/table';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { MatPaginator } from '@angular/material/paginator';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { SessionService } from '@base-core/session/session.service';
import { SnotifyService } from 'ng-snotify';
import { RetaguardaVisualizarResultadosService } from '../retaguarda-visualizar-resultados.service';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { safeCall } from '@base-core/safe-call';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { CadConclusaoModel } from '../model/CadConclusaoModel';
import { CorrigirC170ModalComponent } from '../corrigir-c170-modal/corrigir-c170-modal.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { FileViwerComponent } from 'src/app/components/components/file-viwer/file-viwer.component';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Cadrc170AtualizarModel } from '../model/Cadrc170AtualizarModel ';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { SelectionModel } from '@angular/cdk/collections';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';

@Component({
  selector: 'app-movimento-prod-serv-modal',
  templateUrl: './movimento-prod-serv-modal.component.html',
  styleUrls: ['./movimento-prod-serv-modal.component.scss']
})
export class MovimentoProdServModalComponent implements OnInit {

  isLoading = false;
  tipoAcaoName: string = "";
  tipoEvento: string = "";

  titulo: string = "Documentos de Movimento de Saidas";
  dadosDaConclusao: string = "DADOS DA CONCLUSÃO";
  mGerarPlanilha: boolean = false;
  mProcessando: boolean = false;

  mDisableButons: boolean = false;
  cabbloqueado: boolean = false;
  mAlterouDados: boolean = false;
  public formConclusao!: FormGroup;


  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<MovimentoProdServModel>([]);
  filtrosGenericosLista: FiltrosGenericosModel[] = [];


  @ViewChild(MatPaginator) paginatorPageSize!: MatPaginator;
  displayedColumns: string[] =
    ['origem', 'rc170CodItem', 'r0200DescrItem', 'r0200UnidInv', 'rc170Cfop', 'rc170Qtd', 'rc170VlItem'
      , 'rc170DtMov', 'rc170ChvNfe', 'rc170CodSit', 'editar', 'visualizar'];




  captionColumns: fieldsProperties[] = [
    { caption: 'Origem', weight: 10, mask: '', align: 'left', name: 'origem' },
    { caption: 'Código Item', weight: 10, mask: '', align: 'left', name: 'rc170CodItem' },
    { caption: 'Descrição', weight: 15, mask: '', align: 'center', name: 'r0200DescrItem' },
    { caption: 'Und', weight: 2, mask: '', align: 'center', name: 'r0200UnidInv' },
    { caption: 'CFOP', weight: 2, mask: '', align: 'center', name: 'rc170Cfop' },
    { caption: 'Quantidade', weight: 7, mask: 'valor3dec', align: 'right', name: 'rc170Qtd' },
    { caption: 'Total do Item', weight: 7, mask: 'valor2dec', align: 'right', name: 'rc170VlItem' },
    { caption: 'Data do Movimento', weight: 7, mask: 'date', align: 'center', name: 'rc170DtMov' },
    { caption: 'Chave de Acesso', weight: 7, mask: '', align: 'center', name: 'rc170ChvNfe' },
    { caption: 'Cód Sit', weight: 2, mask: '', align: 'center', name: 'rc170CodSit' },
    { caption: 'Editar', weight: 2, mask: '', align: 'center', name: 'editar' },
    { caption: 'Visualizar', weight: 2, mask: '', align: 'center', name: 'visualizar' },

  ]

  selection = new SelectionModel<any>(false, []);

  constructor(
    private session: SessionService
    , private fb: FormBuilder
    , private retaguardaVisualizarResultadosService: RetaguardaVisualizarResultadosService
    , private snotifyService: SnotifyService
    , public dialogRef: MatDialogRef<MovimentoProdServModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dados: any,
    public dialogC170: MatDialog,
    private sanitizer: DomSanitizer,
    private modalService: SimpleModalService,
    private baixarArquivosService: BaixarArquivosService




  ) { }

  ngOnInit(): void {

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 5;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.dadosDaConclusao = "DADOS DA CONCLUSÃO " + (this.dados.entsai == "E" ? "ENTRADAS" : "SAIDAS");
    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.isLoading = false;
        this.tipoEvento = "Aguardando....";
        this.hideLoading();

      }
    })



    this.fBuscarTabelaBase();
    this.gerarForm();
    this.fBuscarConclusao();


  }



  getAlinhar(pDirecao: any) {

    if (pDirecao === "D") {
      return "text-align:right";
    } else if (pDirecao === "C") {
      return "text-align:center";
    } else
      return "text-align:left";

  }


  getAlingn(pNomeCampo: string) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: string = (this.captionColumns[index].align as string) || 'left';
      if (mAlign === "right") {
        return "text-align:right";
      } else if (mAlign === "center") {
        return "text-align:center";
      } else
        return "text-align:left";

    }
  }

  public getColumnName(pNomeCampo: string) {
    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return pNomeCampo
    } else {
      let mCaption: string | undefined = this.captionColumns[index].caption as string | undefined;

      return mCaption;
    }
  }


  fValorENomeDoCampoParaformatar(pValor: MovimentoProdServModel, pNomeCampo: string) {



    let mValor: string = "";
    mValor = (pValor[pNomeCampo as keyof MovimentoProdServModel] as string) || "";
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: string = (this.captionColumns[mIndex].mask as string) || "";


      return this.fRetornaFormatado(mValor, mTipoCampo);
    }

  }

  fRetornaFormatado(pValor: any, pDataMask: string) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
  }



  cancelarESair() {
    this.dialogRef.close(this.mAlterouDados);
  }


  getStyle3(column: string) {
    let index: number = this.displayedColumns.indexOf(column);
    if (index < 0) {
      return 3
    } else {
      let mTamanho: number = this.captionColumns[index].weight || 3;
      return ' ' + mTamanho + '% ';
    }
  }


  fBuscarTabelaBase() {

    this.showLoading();

    this.tipoEvento = "Carregando dados...";
    this.isLoading = true;
    this.filtrosGenericosLista = [];



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();







    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170CodItem", FuncoesGerais.Igual, this.dados.codItem,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ano", FuncoesGerais.Igual, this.dados.ano,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "entsai", FuncoesGerais.Igual, this.dados.entsai,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




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
            this.hideLoading();

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

  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;
    this.fBuscarTabelaBase();
  }



  gerarForm() {
    this.formConclusao = this.fb.group({
      ano: [{ value: '', disabled: true }, []],
      rc170CodItem: [{ value: '', disabled: true }, []],
      r0200DescrItem: [{ value: '', disabled: true }, []],
      r0200UnidInv: [{ value: '', disabled: true }, []],
      estini: [{ value: '', disabled: true }, []],
      ccEntradas: [{ value: '', disabled: true }, []],
      ccTotali: [{ value: '', disabled: true }, []],
      estfin: [{ value: '', disabled: true }, []],
      ccSaidas: [{ value: '', disabled: true }, []],
      ccTotalii: [{ value: '', disabled: true }, []],
      ccOeQtd: [{ value: '', disabled: true }, []],
      ccOsQtd: [{ value: '', disabled: true }, []],
      ccOeValor: [{ value: '', disabled: true }, []],
      ccOsValor: [{ value: '', disabled: true }, []],
      ccIlb: [{ value: '', disabled: true }, []],
      valorTribOmitido: [{ value: '', disabled: true }, []],
      multaFormal: [{ value: '', disabled: true }, []],

    });

  }



  fBuscarConclusao() {



    this.isLoading = true;
    this.tipoEvento = "Carregando dados...";

    this.filtrosGenericosLista = [];



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ccIdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ccCodItem", FuncoesGerais.finalIgual, this.dados.codItem,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ano", FuncoesGerais.Igual, this.dados.ano,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();





    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;


    // termino




    this.retaguardaVisualizarResultadosService.BuscarResultadosPage(parametrosDados)
      .subscribe((response) => {
        safeCall(response, () => {
          if (response.success) {
            const cadConclusaoModel: CadConclusaoModel = response.objeto[0];
            this.fMapearCadConclusao(cadConclusaoModel);
          } else {
            this.snotifyService.error(response.error);
          }

          this.tipoEvento = "";
        });
        //        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.snotifyService.error(error.error.message);
        this.tipoEvento = "";
      });


  }





  fMapearCadConclusao(cadConclusaoModel: CadConclusaoModel) {
    this.formConclusao!.get("rc170CodItem")!.setValue(cadConclusaoModel.ccCodItem);
    this.formConclusao!.get("r0200DescrItem")!.setValue(cadConclusaoModel.r0200DescrItem);
    this.formConclusao!.get("r0200UnidInv")!.setValue(cadConclusaoModel.r0200UnidInv);
    this.formConclusao!.get("estini")!.setValue(cadConclusaoModel.estini);
    this.formConclusao!.get("ano")!.setValue(cadConclusaoModel.ano);
    this.formConclusao!.get("ccEntradas")!.setValue(cadConclusaoModel.ccEntradas);
    this.formConclusao!.get("ccTotali")!.setValue(cadConclusaoModel.ccTotali);
    this.formConclusao!.get("estfin")!.setValue(cadConclusaoModel.estfin);
    this.formConclusao!.get("ccSaidas")!.setValue(cadConclusaoModel.ccSaidas);
    this.formConclusao!.get("ccTotalii")!.setValue(cadConclusaoModel.ccTotalii);
    this.formConclusao!.get("ccOeQtd")!.setValue(cadConclusaoModel.ccOeQtd);
    this.formConclusao!.get("ccOsQtd")!.setValue(cadConclusaoModel.ccOsQtd);
    this.formConclusao!.get("ccOeValor")!.setValue(cadConclusaoModel.ccOeValor);
    this.formConclusao!.get("ccOsValor")!.setValue(cadConclusaoModel.ccOsValor);
    this.formConclusao!.get("ccIlb")!.setValue(cadConclusaoModel.ccIlb);
    this.formConclusao!.get("valorTribOmitido")!.setValue(cadConclusaoModel.valorTribOmitido);
    this.formConclusao!.get("multaFormal")!.setValue(cadConclusaoModel.multaFormal);


  }


  getMaskForm(qtdDec: number) {

    return "separator." + qtdDec;

    /*
    mask="separator.2"
    thousandSeparator="."
    decimalMarker=","
    [dropSpecialCharacters]="true"
    [showMaskTyped]="false"
    placeholder="0,00"
    [leadZero]="true"


    if (pDirecao === "D") {
      return "text-align:right";
    } else if (pDirecao === "C") {
      return "text-align:center";
    } else
      return "text-align:left";

*/

  }




  Editar(movimentoProdServModel: MovimentoProdServModel) {

    const dialogRef = this.dialogC170.open(CorrigirC170ModalComponent, {
      disableClose: true,
      panelClass: 'app-no-padding-dialog',
      width: '80%',
      data: {
        idPessoa: this.session.companyId,
        movimentoProdServModel: movimentoProdServModel

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      safeCall(result, () => {
        let cadrc170AtualizarModel: Cadrc170AtualizarModel = result;
        this.fSalvarCadrc170(cadrc170AtualizarModel);
        this.mAlterouDados = true;

      });
    });




  }


  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }



  fSalvarCadrc170(cadrc170AtualizarModel: Cadrc170AtualizarModel) {

    if (cadrc170AtualizarModel.rc170CodItemNovo === cadrc170AtualizarModel.rc170CodItemAnt &&
      cadrc170AtualizarModel.rc170QtdNova === cadrc170AtualizarModel.rc170QtdAnt) {
      this.snotifyService.info("Não houve alteração no registro");
      return;
    }


    try {




      this.showLoading();


      this.retaguardaVisualizarResultadosService.salvarcadrc170Ajustar(cadrc170AtualizarModel).subscribe((Response) => {
        safeCall(Response, () => {

          if (Response.success) {
            this.fBuscarConclusao();
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

  VisualizarDanfe(movimentoProdServModel: MovimentoProdServModel) {


    this.showLoading();

    this.tipoEvento = "Carregando dados...";
    this.filtrosGenericosLista = [];
    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();


    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170ChvNfe", FuncoesGerais.Igual,
        movimentoProdServModel.rc170ChvNfe || "",
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

    this.hideLoading();
  }


  paginaProxima() {
    this.paginatorPageSize.pageIndex = this.paginatorPageSize.pageIndex +
      ((this.paginatorPageSize.pageIndex + 1) < this.filterPaginator.totalPages! ? 1 : 0);
    this.changeEvent();
  }
  paginaAnterior() {
    this.paginatorPageSize.pageIndex--;
    this.changeEvent();
  }

  paginaUltima() {
    this.paginatorPageSize.pageIndex = this.filterPaginator.totalPages! - 1;
    this.changeEvent();

  }

  paginaPrimeira() {
    this.paginatorPageSize.pageIndex = 0;
    this.changeEvent();
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



// INICIKO 

  async onDblClick(pValor: CadConclusaoModel, pNomeCampo: string) {

    let mValor: String = "";
    mValor = (pValor as any)[pNomeCampo];

      try {
        await navigator.clipboard.writeText(mValor.toString());
        this.snotifyService.info(mValor + " copiado!");

      } catch (err) {
        this.snotifyService.warning('erro' + err + " ao copiar " + pNomeCampo);
      }

    }
// termino


}
