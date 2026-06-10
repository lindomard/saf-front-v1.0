import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@base-core/session/session.service';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { CadConclusaoModel } from '../model/CadConclusaoModel';
import { MatTableDataSource } from '@angular/material/table';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { MatPaginator } from '@angular/material/paginator';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { safeCall } from '@base-core/safe-call';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { attribuiSeVazio, getRelacionarCondicao, ultimoDiaDoAno } from '@base-shared/funcoesGerais/funcoesDiversas';
import { CamposParaFiltros, FilterFields, OrderFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { RetaguardaVisualizarResultadosService } from '../retaguarda-visualizar-resultados.service';
import { SnotifyService } from 'ng-snotify';
import { MatDialog } from '@angular/material/dialog';
import { MovimentoProdServModalComponent } from '../movimento-prod-serv-modal/movimento-prod-serv-modal.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { debounceTime } from 'rxjs/operators';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { GenericosService } from 'src/app/genericos/genericos.service';
import { cadreltabMapper } from 'src/app/dados-comuns/mapper/cadrelpad-mapper';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-conclusao',
  templateUrl: './conclusao.component.html',
  styleUrls: ['./conclusao.component.scss'],

})
export class ConclusaoComponent implements OnInit {

  isLoading = false;
  tipoAcaoName: string = "";
  tipoEvento: string = "";

  @ViewChild('r0200DescrItem') buscaUsuario: any;



  public formulario!: FormGroup;

  searchControl!: FormControl;

  mGerarPlanilha: boolean = false;
  mProcessando: boolean = false;

  mDisableButons: boolean = false;

  mDisableGerar: boolean = false;

  opcao: string = '4';

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<CadConclusaoModel>([]);
  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  dataSourceTableFilpadCab: CadTableFilpadCabModel = {};
  dataSourcecamposParaFiltrosList = new MatTableDataSource<CamposParaFiltros>([]);
  camposConsultaPor: CadTableFilpadCamposModel[] = [];


  @ViewChild(MatPaginator) paginatorPageSize!: MatPaginator;


  pesquisarPorcampoParaFiltro: CamposParaFiltros = {};
  private cadrelpadMapper = cadreltabMapper();


  displayedColumns: String[] = ['ano', 'ccCodItem', 'r0200DescrItem', 'r0200UnidInv'
    , 'estini', 'ccEntradas', 'ccTotali', 'estfin', 'ccSaidas', 'ccTotalii'
    , 'ccSiglatipoPreco', 'ccPrecoUnitario', 'ccOeQtd'
    , 'ccOsQtd', 'ccOeValor', 'ccOsValor', 'ccIlb', 'valorTribOmitido', 'multaFormal']




  captionColumns: fieldsProperties[] = [
    { caption: 'Ano', weight: 3, mask: '', align: 'center', name: 'ano' },
    { caption: 'Código Item', weight: 9, mask: '', align: 'left', name: 'ccCodItem' },
    { caption: 'Descriçao', weight: 14, mask: '', align: 'center', name: 'r0200DescrItem' },
    { caption: 'Und', weight: 2, mask: '', align: 'center', name: 'r0200UnidInv' },
    { caption: 'Estoque Inicial', weight: 7, mask: 'valor3dec', align: 'right', name: 'estini' },
    { caption: 'Entradas', weight: 7, mask: 'valor3dec', align: 'right', name: 'ccEntradas' },
    { caption: 'Total I', weight: 7, mask: 'valor3dec', align: 'right', name: 'ccTotali' },

    { caption: 'Estoque Final', weight: 7, mask: 'valor3dec', align: 'right', name: 'estfin' },
    { caption: 'Saidas', weight: 7, mask: 'valor3dec', align: 'right', name: 'ccSaidas' },

    { caption: 'Total II', weight: 7, mask: 'valor3dec', align: 'right', name: 'ccTotalii' },
    { caption: 'Tipo', weight: 2, mask: '', align: 'right', name: 'ng' },
    { caption: 'PRECO UNIT', weight: 5, mask: 'valor3dec', align: 'right', name: 'ccPrecoUnitario' },

    { caption: 'Omissão Entrada Qtd', weight: 7, mask: 'valor3dec', align: 'right', name: 'ccOeQtd' },
    { caption: 'Omissão Saida Qtd', weight: 7, mask: 'valor3dec', align: 'right', name: 'ccOsQtd' },

    { caption: 'Omissão Entrada Vlr', weight: 7, mask: 'valor2dec', align: 'right', name: 'ccOeValor' },
    { caption: 'Omissão Saida Vlr', weight: 7, mask: 'valor2dec', align: 'right', name: 'ccOsValor' },


    { caption: '% Lucro', weight: 7, mask: 'valor2dec', align: 'right', name: 'ccIlb' },


    { caption: 'Valor trib Omitido', weight: 7, mask: 'valor2dec', align: 'right', name: 'valorTribOmitido' },

    { caption: 'Multa Formal', weight: 7, mask: 'valor2dec', align: 'right', name: 'multaFormal' }


  ]

  selection = new SelectionModel<any>(false, []);


  constructor(private session: SessionService
    , private router: Router
    , private retaguardaVisualizarResultadosService: RetaguardaVisualizarResultadosService

    , private snotifyService: SnotifyService
    , public dialog: MatDialog
    , private fb: FormBuilder
    , private baixarArquivosService: BaixarArquivosService
    , private genericosService: GenericosService

  ) { }

  ngOnInit(): void {

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 5;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;






    BaixarArquivosService.terminouDownload.subscribe(terminou => {

      if (terminou == true) {
        this.mDisableGerar = false;
        this.tipoEvento = "Aguardando....";
        this.isLoading = false;
      }
    })
    this.gerarForm();
    //this.searchControl 

    this.formulario.valueChanges.pipe(debounceTime(500)).subscribe((user: CadConclusaoModel) => {
      this.fBuscarTabelaBase()
    });



    //    this.formulario.get("multa").valueChanges.pipe(debounceTime(1000));

    this.fBuscarTableFilpad();

  }

  cancelarESair() {
    if (this.session.companyId == "0") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/retaguardaVisualizar']);
    }

  }


  getAlingn(pNomeCampo: any) {

    let index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index > -1) {

      let mAlign: String | undefined = this.captionColumns[index].align;
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
      let mCaption: String | undefined = this.captionColumns[index].caption;

      return mCaption;
    }
  }


  fValorENomeDoCampoParaformatar(pValor: CadConclusaoModel, pNomeCampo: string) {



    let mValor: string = "";
    mValor = (pValor as any)[pNomeCampo];
    let mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {

      let mTipoCampo: String | undefined = this.captionColumns[mIndex].mask;


      return this.fRetornaFormatado(mValor, mTipoCampo!);
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


  getStyle3(any: any) {
    let index: number = this.displayedColumns.indexOf(any);
    if (index < 0) {
      return 3
    } else {
      let mTamanho: number = this.captionColumns[index].weight ?? 2;
      return ' ' + mTamanho + '% ';
    }
  }


  fBuscarTabelaBase() {



    this.tipoEvento = "Carregando dados...";

    this.filtrosGenericosLista = [];





    this.fAdicionarfiltros();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;

    parametrosDados.orderFields = this.fPegarOrderFieldsLista(this.dataSourceTableFilpadCab.cadTableFilpadCampos || []);


    // termino




    this.retaguardaVisualizarResultadosService.BuscarResultadosPage(parametrosDados)
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


            // this.dataSourceWithPageSize.data.forEach( dados=> {

            //   console.log('nome do item comprado ', dados.entDescrItem )
            //   console.log('nome do item vendido ', dados.saiDescrItem )
            //   console.log('chassis ', dados.chassis )

            // })



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


  }


  async onDblClick(pValor: CadConclusaoModel, pNomeCampo: string) {

    let mValor: String = "";
    mValor = (pValor as any)[pNomeCampo];

    try {
      await navigator.clipboard.writeText(mValor.toString());
      this.snotifyService.info(mValor + " copiado!");

    } catch (err) {
      this.snotifyService.warning('erro' + err + " ao copiar " + pNomeCampo);
    }

    console.log('nome do campo ' + pNomeCampo + ' p valor ' + mValor);
    this.snotifyService.warning('nome do campo ' + pNomeCampo + ' p valor ' + mValor + " Copiado!");


    let mEntsai = ""

    if (pNomeCampo == "ccSaidas") {
      mEntsai = "S";
    } else if (pNomeCampo == "ccEntradas") {
      mEntsai = "E";
    }

    console.log('entsai ', mEntsai)

    if (mEntsai.length > 0) {
      const dialogRef = this.dialog.open(MovimentoProdServModalComponent, {
        disableClose: true,
        panelClass: 'app-no-padding-dialog',
        width: '80%',
        data: {
          idPessoa: this.session.companyId,
          ano: pValor.ano,
          codItem: pValor.ccCodItem,
          entsai: mEntsai

        }
      });


      dialogRef.afterClosed().subscribe(result => {
        safeCall(result, () => {
          if (result == true) {
            this.fBuscarTabelaBase();
          }
        });
      });

    }
  }


  gerarForm() {
    this.formulario = this.fb.group({
      r0200DescrItem: '',
      rc170CodItem: '',
      ano: '',



    });
  }


  // INICIO
  fAdicionarfiltros() {

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();



    safeCall(this.formulario.get("r0200DescrItem")!.value, (Descricao) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "r0200DescrItem", FuncoesGerais.contenha, Descricao,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();

    })

    safeCall(this.formulario.get("rc170CodItem")!.value, (CodItem) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ccCodItem", FuncoesGerais.finalIgual, CodItem,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();

    })


    safeCall(this.formulario.get("ano")!.value, (ano) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "ano", FuncoesGerais.Igual, ano,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();

    })



    safeCall(this.pesquisarPorcampoParaFiltro.valor, () => {


      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, this.pesquisarPorcampoParaFiltro.nomeDoCampo!,
          this.pesquisarPorcampoParaFiltro.condicao!, this.pesquisarPorcampoParaFiltro.valor!,
          1, getRelacionarCondicao()[0].id).adicionarfiltros();



    })


    this.dataSourcecamposParaFiltrosList.data.forEach(filtro => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, filtro.nomeDoCampo!,
          filtro.condicao!, filtro.valor!, filtro.grupoFiltro!, filtro.relacionarCondicao!).adicionarfiltros();


    })


      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "tipoOmissao",
          "=", this.opcao,
          1, getRelacionarCondicao()[0].id).adicionarfiltros();






  }


  fPegarOrderFieldsRelatorio(cadTableFilpadCamposModel: CadTableFilpadCamposModel[]): OrderFields[] {

    let orderFieldsLista: OrderFields[] = [];



    let dataSourceFilpadRelCamposOrdemResult: CadTableFilpadCamposModel[] =
      cadTableFilpadCamposModel.filter(it =>
        it.tfpcOrdemRelResult! > 0)


    dataSourceFilpadRelCamposOrdemResult.sort((a, b) => a.tfpcOrdemRelResult! - b.tfpcOrdemRelResult!);




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


  fPegarOrderFieldsLista(cadTableFilpadCamposModel: CadTableFilpadCamposModel[]): OrderFields[] {

    let orderFieldsLista: OrderFields[] = [];



    let dataSourceFilpadRelCamposOrdemResult: CadTableFilpadCamposModel[] =
      cadTableFilpadCamposModel.filter(it =>
        it.tfpcOrdemResCons! > 0)


    dataSourceFilpadRelCamposOrdemResult.sort((a, b) => a.tfpcOrdemResCons! - b.tfpcOrdemResCons!);




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


  fBuscarPlanilha() {



    this.tipoEvento = "Gerando Planilha...";

    this.isLoading = true;

    this.tipoEvento = "Carregando dados...";

    this.filtrosGenericosLista = [];

    /*
    r0200DescrItem: '',
          rc170CodItem: '',
          
    */


    this.fAdicionarfiltros();

    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadConclusaoPlanilha"

    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos!);





    this.retaguardaVisualizarResultadosService.CadConclusaoPlanilha(parametrosDados)
      .subscribe((response) => {
        safeCall(response.success, () => {

          this.baixarPlanilhas(response.objeto);


        })
      }, error => {
        this.snotifyService.error(error.error.message);
        BaixarArquivosService.terminouDownload.emit(true);

      }
      )







  }


  baixarPlanilhas(nomeDoArquivoGeradoModel: NomeDoArquivoGeradoModel[]) {


    //    console.log('tamanhoa ', nomeDoArquivoGeradoModel.length );

    nomeDoArquivoGeradoModel.forEach(obj => {
      if (obj.nomeDoArquivoGerado != null && obj.nomeDoArquivoGerado.length > 0) {
        this.baixarArquivosService.downloadarquivo(obj.nomeDoArquivoGerado);

      }
      BaixarArquivosService.terminouDownload.emit(false)

    });





  }

  // inicio relatorio
  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  baixarRelatorio() {

    this.tipoEvento = "Gerando Relatorio...";



    this.tipoEvento = "Carregando dados...";
    this.mDisableGerar = true;
    this.showLoading();

    this.filtrosGenericosLista = [];

    this.fAdicionarfiltros();





    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadConclusaoRelatorio"

    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "cadConclusaoRelatorio";
    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos!);




  }

  // do customizado inicio

  fAtualizarBusca() {
    this.filterPaginator.page = 0;
    this.fBuscarTabelaBase();
  }


  fAtualizarBusca2(event: any) {
    this.pesquisarPorcampoParaFiltro = event;
    this.filterPaginator.page = 0;

    this.fBuscarTabelaBase();
  }

  resetarConfiguracoes() {
    console.log(' evento 1095 ')
    this.fBuscarTableFilpad();
  }


  fBuscarTableFilpad() {



    this.showLoading();
    this.tipoEvento = "Carregando dados...";


    this.filtrosGenericosLista = [];




    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;




    this.genericosService.buscarDadosGenericos("cadconclusaoCamposParaFiltrosCustomizados"
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

  fAtualizarFiltros(cadTableFilpadCabModelPar: CadTableFilpadCabModel) {
    this.fAtualizarTable(cadTableFilpadCabModelPar);

  }

  fAtualizarTable(cadTableFilpadCab: CadTableFilpadCabModel) {

    let cadTableFilpadCamposLista: CadTableFilpadCamposModel[] = this.cadrelpadMapper.converterCadTableCamposModelToModel(cadTableFilpadCab.cadTableFilpadCampos!);


    cadTableFilpadCamposLista.forEach(camposTable => {
      camposTable.selecionado = camposTable.tfpcOrdemLista! > 0;
    }
    )



    cadTableFilpadCamposLista = cadTableFilpadCamposLista.sort((a, b) =>
      (a.selecionado == true ? 0 : 1) - (b.selecionado == true ? 0 : 1) || a.tfpcOrdemLista! - b.tfpcOrdemLista!
    );



    // lista inicio
    cadTableFilpadCamposLista = cadTableFilpadCamposLista.filter(it =>
      it.tfpcOrdemLista! > 0
    )

    cadTableFilpadCamposLista.sort((a, b) => a.tfpcOrdemLista! - b.tfpcOrdemLista!);

    // lista termino


    // INICIO  pesquisar por 


    let camposConsultaPorNew: CadTableFilpadCamposModel[] =
      this.cadrelpadMapper.converterCadTableCamposModelToModel(cadTableFilpadCab.cadTableFilpadCampos!);


    camposConsultaPorNew = camposConsultaPorNew.filter(it =>
      it.tfpcOrdemPesqpor! > 0
    )

    camposConsultaPorNew.forEach(camposTable => {
      camposTable.selecionado = true;
    }
    )







    camposConsultaPorNew.sort((a, b) => a.tfpcOrdemPesqpor! - b.tfpcOrdemPesqpor!);

    this.camposConsultaPor = camposConsultaPorNew;




    this.captionColumns = [];
    this.displayedColumns = [];
    cadTableFilpadCamposLista.forEach(campos => {

      this.displayedColumns.push(campos.tfpcNomeCampo!)
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

  fAjustarDisplayColumnsTable() {

    this.fAtualizarTable(this.dataSourceTableFilpadCab);
    this.fBuscarTabelaBase();
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

  marcar(valor: string) {
    this.opcao = valor;
    this.fBuscarTabelaBase();
  }

}