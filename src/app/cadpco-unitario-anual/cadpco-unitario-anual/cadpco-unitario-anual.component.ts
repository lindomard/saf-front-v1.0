import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SessionService } from '@base-core/session/session.service';
import { CadpcoUnitarioAnualService } from '../cadpco-unitario-anual.service';
import { SnotifyService } from 'ng-snotify';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenericosService } from 'src/app/genericos/genericos.service';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { CadpcoUnitarioAnualModel } from '../model/CadpcoUnitarioAnualModel';
import { MatTableDataSource } from '@angular/material/table';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { cadreltabMapper } from 'src/app/dados-comuns/mapper/cadrelpad-mapper';
import { CamposParaFiltros, FilterFields, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { MatPaginator } from '@angular/material/paginator';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { safeCall } from '@base-core/safe-call';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { MovimentoProdServModel } from 'src/app/retaguarda-visualizar-resultados/model/MovimentoProdServModel';
import { ProdutoXCfopDetalhesComponent } from 'src/app/produto-x-cfop/produto-x-cfop-detalhes/produto-x-cfop-detalhes.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { SelectionModel } from '@angular/cdk/collections';
import { CadpcoUnitarioAnualInventarioComponent } from '../cadpco-unitario-anual-inventario/cadpco-unitario-anual-inventario.component';

@Component({
  selector: 'app-cadpco-unitario-anual',
  templateUrl: './cadpco-unitario-anual.component.html',
  styleUrls: ['./cadpco-unitario-anual.component.scss']
})
export class CadpcoUnitarioAnualComponent implements OnInit {

  constructor(
    private fb: FormBuilder
    , private session: SessionService
    , private cadpcoUnitarioAnualService: CadpcoUnitarioAnualService
    , private snotifyService: SnotifyService
    , private baixarArquivosService: BaixarArquivosService
    , private router: Router
    , public dialog: MatDialog
    , private genericosService: GenericosService
    , private cd: ChangeDetectorRef
  ) {
    this.resetarConfiguracoes();


  }

  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<CadpcoUnitarioAnualModel>([]);
  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  mQtdBusca: number = 0;
  selection = new SelectionModel<any>(false, []);


  private cadrelpadMapper = cadreltabMapper();

  dataSourcecamposParaFiltrosList = new MatTableDataSource<CamposParaFiltros>([]);

  camposConsultaPor: CadTableFilpadCamposModel[] = [];

  dataSourceTableFilpadCab: CadTableFilpadCabModel = {};

  pesquisarPorcampoParaFiltro: CamposParaFiltros = {};

  @ViewChild(MatPaginator, { static: false }) paginatorPageSize!: MatPaginator;
  mDisableGerar: boolean = false;
  tipoEvento: string = "Carregando dados...";

  isLoading = false;

  public formulario!: FormGroup;
  displayedColumns: string[] = ['puaId', 'puaCodItem', 'puaAno', 'r0200DescrItem', 'r0200UnidInv'
    , 'puaPrecoMediaEntradas', 'puaPrecoMediaSaidas', 'puaPrecoInvfin', 'puaPrecoInvini'
    , 'puaPrecoEntradasMenor', 'puaPrecoSaidasMenor', 'puaPrecoEntradasMaior', 'puaPrecoSaidasMaior'
    , 'puaPcoCustoPrimMp']

  captionColumns: fieldsProperties[] = [
    { caption: 'Ano', weight: 5, mask: '', align: 'center', name: 'puaAno' },
    { caption: 'Código Item', weight: 10, mask: '', align: 'center', name: 'puaCodItem' },
    { caption: 'Descrição', weight: 15, mask: '', align: 'center', name: 'r0200DescrItem' },
    { caption: 'Und', weight: 5, mask: '', align: 'center', name: 'r0200UnidInv' },
    { caption: 'Pco Medio Entradas', weight: 10, mask: 'valor2Dec', align: 'right', name: 'puaPrecoMediaEntradas' },
    { caption: 'Pco Media Saidas', weight: 10, mask: 'valor2Dec', align: 'right', name: 'puaPrecoMediaSaidas' },
    { caption: 'Pco Inv Final', weight: 10, mask: 'valor2Dec', align: 'right', name: 'puaPrecoInvfin' },
    { caption: 'Pco Inv Inicial', weight: 10, mask: 'valor2Dec', align: 'right', name: 'puaPrecoInvini' },
    { caption: 'Pco Entrada Menor', weight: 10, mask: 'valor2Dec', align: 'right', name: 'puaPrecoEntradasMenor' },
    { caption: 'Pco Saida Menor', weight: 15, mask: 'valor2Dec', align: 'right', name: 'puaPrecoSaidasMenor' },
    { caption: 'Pco Entrada Maior', weight: 15, mask: 'valor2Dec', align: 'right', name: 'puaPrecoEntradasMaior' },
    { caption: 'Pco Saida Maior', weight: 15, mask: 'valor2Dec', align: 'right', name: 'puaPrecoSaidasMaior' },
    { caption: 'Pco Custo Primária MP', weight: 15, mask: 'valor2Dec', align: 'right', name: 'puaPcoCustoPrimMp' }
  ]


  ngOnInit(): void {


    this.filterPaginator.page = 0;
    this.filterPaginator.size = 10;
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

  }

  resetarConfiguracoes() {
    console.log(' evento 1095 ')
    this.fBuscarTableFilpad();

  }


  gerarForm() {
    this.formulario = this.fb.group({
      r0200DescrItem: ['', []],
      rc170CodItem: ['', []],
      rc170Cfop: ['', []],
      rc170DtMovIni: ['', []],
      rc170DtMovFin: ['', []],


    });

    this.fBuscarTabelaBase("form");
  }


  fAtualizarFiltrosRel(): ParametrosDados {

    this.filtrosGenericosLista = [];



    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();

    safeCall(this.formulario.get("r0200DescrItem")!.value, (Descricao) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "r0200DescrItem", FuncoesGerais.contenha, Descricao,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();

    })

    console.log('codigo do item ', this.formulario.get("rc170CodItem")!.value);
    safeCall(this.formulario.get("rc170CodItem")!.value, (CodItem) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170CodItem", FuncoesGerais.finalIgual, CodItem,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();

    })

    safeCall(this.formulario.get("rc170Cfop")!.value, (Cfop) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170Cfop", FuncoesGerais.Igual, Cfop,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();

    })

    safeCall(this.formulario.get("rc170DtMovIni")!.value, (dataInicial) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170DtMovIni", FuncoesGerais.maiorIgual, dataInicial,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();

    })

    safeCall(this.formulario.get("rc170DtMovFin")!.value, (dataFinal) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170DtMovFin", FuncoesGerais.menorIgual, dataFinal,
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



    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    return parametrosDados;

  }



  fBuscarTabelaBase(origem: string) {

    this.mQtdBusca++;
    console.log('qtd tentativa ', this.mQtdBusca, ' origem ', origem, ' data ', new Date());
    this.isLoading = true;


    this.tipoEvento = "Carregando dados...";

    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();

    safeCall(this.formulario.get("r0200DescrItem")?.value, (Descricao) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "r0200DescrItem", FuncoesGerais.contenha, Descricao,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();
    })

    safeCall(this.formulario.get("rc170CodItem")?.value, (CodItem) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170CodItem", FuncoesGerais.finalIgual, CodItem,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();
    })

    safeCall(this.formulario.get("rc170Cfop")?.value, (Cfop) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170Cfop", FuncoesGerais.Igual, Cfop,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();
    })

    safeCall(this.formulario.get("rc170DtMovIni")?.value, (dataInicial) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170DtMovIni", FuncoesGerais.maiorIgual, dataInicial,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();
    })

    safeCall(this.formulario.get("rc170DtMovFin")?.value, (dataFinal) => {
      this.filtrosGenericosLista = new
        AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170DtMovFin", FuncoesGerais.menorIgual, dataFinal,
          2, getRelacionarCondicao()[0].id).adicionarfiltros();
    })

    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "cadpcoUnitarioAnual";

    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;

    // inicio
    safeCall(this.pesquisarPorcampoParaFiltro.valor, () => {
      if (this.pesquisarPorcampoParaFiltro.nomeDoCampo && this.pesquisarPorcampoParaFiltro.condicao) {
        this.filtrosGenericosLista = new
          AdicionarFiltrosGenericos(this.filtrosGenericosLista, this.pesquisarPorcampoParaFiltro.nomeDoCampo!,
            this.pesquisarPorcampoParaFiltro.condicao!, this.pesquisarPorcampoParaFiltro.valor!,
            1, getRelacionarCondicao()[0].id).adicionarfiltros();
      }
    })

    this.dataSourcecamposParaFiltrosList.data.forEach(filtro => {
      if (filtro.nomeDoCampo && filtro.condicao) {
        this.filtrosGenericosLista = new
          AdicionarFiltrosGenericos(this.filtrosGenericosLista, filtro.nomeDoCampo!,
            filtro.condicao!, filtro.valor!, filtro.grupoFiltro!, filtro.relacionarCondicao!).adicionarfiltros();
      }
    })

    // termino




    this.cadpcoUnitarioAnualService.cadpcoUnitarioAnualGet(parametrosDados)
      .subscribe((response) => {
        safeCall(response, () => {


          if (response.success) {
            this.dataSourceWithPageSize.data = [...response.objeto.content];
            this.filterPaginator.page = response.objeto.pageable.pageNumber;
            this.filterPaginator.size = response.objeto.pageable.pageSize;
            this.filterPaginator.totalElements = response.objeto.totalElements;
            this.filterPaginator.totalPages = response.objeto.totalPages;



          } else {
            this.snotifyService.error(response.error);
          }

          this.isLoading = false;

          this.tipoEvento = "Aguardando....";



        })
      }, error => {
        this.isLoading = false;

        this.snotifyService.error(error.error.message);
        this.tipoEvento = "Aguardando....";
      }
      )


  }

  showLoading() {
    this.isLoading = true;
  }

  hideLoading() {
    this.isLoading = false;
  }


  // inicio filpad


  fBuscarTableFilpad() {



    this.showLoading();
    this.tipoEvento = "Carregando dados...";


    this.filtrosGenericosLista = [];




    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;




    this.genericosService.buscarDadosGenericos("cadpcoUnitarioAnualCamposParaFiltrosCustomizados"
      , parametrosDados)
      .subscribe((Response) => {

        safeCall(Response, () => {
          if (Response.success) {

            //            console.log('chegou 761 ',JSON.stringify(Response));

            this.dataSourceTableFilpadCab = Response.objeto.cadTableFilpadCabResponseModel;
            //            this.dataSourceTableFilpadCabRelatorio = 
            //this.cadrelpadMapper.converterCabTableModelToModel(this.dataSourceTableFilpadCab);


            //            this.dataSourceTableFilpadCabRelatorio = this.cadrelpadMapper.converterCamposModelToModel ()
            //            this.fAtualizarTable(this.dataSourceTableFilpadCab);


            this.fAtualizarFiltros(this.dataSourceTableFilpadCab);

            //            this.fBuscarTabelaBase("");
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

  // termino

  // termino fil
  fAtualizarFiltros(cadTableFilpadCabModelPar: CadTableFilpadCabModel) {
    this.fAtualizarTable(cadTableFilpadCabModelPar);

  }


  fAtualizarTable(cadTableFilpadCab: CadTableFilpadCabModel) {

    let cadTableFilpadCamposLista: CadTableFilpadCamposModel[] = this.cadrelpadMapper.converterCadTableCamposModelToModel(cadTableFilpadCab.cadTableFilpadCampos ?? []);

    cadTableFilpadCamposLista = cadTableFilpadCamposLista.filter(it =>
      it.tfpcOrdemLista != null && it.tfpcOrdemLista > 0
    )

    cadTableFilpadCamposLista = cadTableFilpadCamposLista.sort((a, b) => (a.tfpcOrdemLista ?? 0) - (b.tfpcOrdemLista ?? 0));


    this.captionColumns = [];
    this.displayedColumns = [];
    cadTableFilpadCamposLista.forEach(campos => {

      if (campos.tfpcNomeCampo) {
        this.displayedColumns.push(campos.tfpcNomeCampo as string);
      }
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

    this.cd.detectChanges();


  }


  cancelarESair() {
    if (this.session.companyId == "0") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/home']);
    }

  }


  changeEvent() {
    console.log('adionou changeevent ', new Date());
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

    this.fBuscarTabelaBase("change event");
  }



  fAtualizarBusca2(event: CamposParaFiltros) {
    this.pesquisarPorcampoParaFiltro = event;
    this.filterPaginator.page = 0;

    this.fBuscarTabelaBase("");
  }



  baixarRelatorio() {

    this.tipoEvento = "Gerando Relatorio...";
    this.tipoEvento = "Carregando dados...";
    this.mDisableGerar = true;
    this.showLoading();

    this.filtrosGenericosLista = [];

    this.fAtualizarFiltrosRel();





    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "produtoXCfopRelatorio"

    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "produtoXCfopRelatorio";
    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
    //    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos!);






  }

  // inicio planilha


  fBuscarPlanilha() {



    this.tipoEvento = "Gerando Planilha...";

    this.isLoading = true;

    this.tipoEvento = "Carregando dados...";





    let parametrosDados: ParametrosDados = {};
    parametrosDados = this.fAtualizarFiltrosRel();

    parametrosDados.nomeRelatorio = "cadpcoUnitarioAnualPlanilha"






    this.cadpcoUnitarioAnualService.cadpcoUnitarioAnualPlanilha(parametrosDados)
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


  // termino planilha
  fAtualizarBusca() {
    this.filterPaginator.page = 0;
    this.fBuscarTabelaBase("");
  }


  fAjustarDisplayColumnsTable() {

    this.fAtualizarTable(this.dataSourceTableFilpadCab);
    this.fBuscarTabelaBase("");
    //  console.log('atualizando os tables  qtd reg ', this.dataSourceTableFilpadCampos.data.length)
  }



  getAlingn(pNomeCampo: string) {
    const index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    //    let index: number = this.displayedColumns.indexOf(any);
    if (index > -1) {
      const mAlign = this.captionColumns[index].align || 'left';
      if (mAlign === "right") {
        return "text-align:right";
      } else if (mAlign === "center") {
        return "text-align:center";
      }
      return "text-align:left";
    }
    return "text-align:left";
  }

  public getColumnName(pNomeCampo: string) {
    const index = this.captionColumns.findIndex(x => x.name == pNomeCampo);
    if (index < 0) {
      return pNomeCampo;
    }
    return this.captionColumns[index].caption || pNomeCampo;
  }

  getStyle3(nomeCampo: string) {
    const index: number = this.displayedColumns.indexOf(nomeCampo);
    if (index < 0) {
      return 3;
    }
    const mTamanho = this.captionColumns[index].weight || 3;
    return ' ' + mTamanho + '% ';
  }



  onDblClick(pValor: CadpcoUnitarioAnualModel, pNomeCampo: string) {

    const mValor: any = (pValor as any)[pNomeCampo];




    const dialogRef = this.dialog.open(CadpcoUnitarioAnualInventarioComponent, {
      disableClose: true,
      panelClass: 'app-no-padding-dialog',
      width: '80%'
      ,
      data: {
        idPessoa: this.session.companyId,
        codItem: pValor.puaCodItem,
        puaAno: pValor.puaAno,
        titulo: "Origem do Preço Unitario do Inventario Inicial",
        displayedColumns: ['ipCodItem', 'cadr0200UnicoResumido.r0200DescrItem',
          'cadr0200UnicoResumido.r0200UnidInv',
          'ipSaldoInicial', 'ipValorTotalInicial', 'ipPrecoUnitInicial']

      }
    });


    dialogRef.afterClosed().subscribe(result => {
      safeCall(result, () => {
        if (result == true) {
          this.fBuscarTabelaBase("");
        }
      });
    });

  }


  fValorENomeDoCampoParaformatar(pValor: CadpcoUnitarioAnualModel, pNomeCampo: string) {
    const mValor: any = (pValor as any)[pNomeCampo];
    const mIndex = this.captionColumns.findIndex(x => x.name === pNomeCampo);
    if (mIndex > -1) {
      const mTipoCampo = this.captionColumns[mIndex].mask || '';
      return this.fRetornaFormatado(mValor, mTipoCampo);
    }
    return mValor;
  }

  fRetornaFormatado(pValor: any, pDataMask: String) {
    return new FormatarCamposDastabelas(pValor, pDataMask).formatar();
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


}
