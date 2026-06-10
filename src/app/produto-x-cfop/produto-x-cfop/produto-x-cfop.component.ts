import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { ProdutoXCfopModel } from '../model/produto-x-cfop-model';
import { MatTableDataSource } from '@angular/material/table';
import { fieldsProperties } from 'src/app/visualizar-resultados/resultados/resultados.component';
import { FormatarCamposDastabelas } from '@base-shared/funcoesGerais/formatarCamposDasTabelas';
import { MatPaginator } from '@angular/material/paginator';
import { BaixarArquivosService } from '@base-core/service/baixar-arquivos-services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { safeCall } from '@base-core/safe-call';
import { SessionService } from '@base-core/session/session.service';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { attribuiSeVazio, getRelacionarCondicao, ultimoDiaDoAno } from '@base-shared/funcoesGerais/funcoesDiversas';
import { CamposParaFiltros, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { ProdutoXCfopService } from '../produto-x-cfop.service';
import { SnotifyService } from 'ng-snotify';
import { isEmpty } from 'rxjs-compat/operator/isEmpty';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { Router } from '@angular/router';
import { MovimentoProdServModel } from 'src/app/retaguarda-visualizar-resultados/model/MovimentoProdServModel';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoXCfopDetalhesComponent } from '../produto-x-cfop-detalhes/produto-x-cfop-detalhes.component';
import { CadTableFilpadCabModel } from 'src/app/genericos/model/CadTableFilpadCabModel';
import { CadTableFilpadCamposModel } from 'src/app/genericos/model/CadTableFilpadCamposModel';
import { GenericosService } from 'src/app/genericos/genericos.service';
import { cadreltabMapper } from 'src/app/dados-comuns/mapper/cadrelpad-mapper';

@Component({
  selector: 'app-produto-x-cfop',
  templateUrl: './produto-x-cfop.component.html',
  styleUrls: ['./produto-x-cfop.component.scss']
})
export class ProdutoXCfopComponent implements OnInit {

  constructor(private fb: FormBuilder
    , private session: SessionService
    , private produtoXCfopService: ProdutoXCfopService
    , private snotifyService: SnotifyService
    , private baixarArquivosService: BaixarArquivosService
    , private router: Router
    , public dialog: MatDialog
    , private genericosService: GenericosService



  ) { }


  filterPaginator: FilterPaginator = {};
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20, 100];
  dataSourceWithPageSize = new MatTableDataSource<MovimentoProdServModel>([]);
  filtrosGenericosLista: FiltrosGenericosModel[] = [];

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
  displayedColumns: string[] = ['r0200DescrItem', 'rc170CodItem', 'rc170Cfop', 'qtd', 'totItem']

  captionColumns: fieldsProperties[] = [
    { caption: 'Descrição', weight: 50, mask: '', align: 'center', name: 'r0200DescrItem' },
    { caption: 'Código Item', weight: 10, mask: '', align: 'center', name: 'rc170CodItem' },
    { caption: 'Cfop', weight: 10, mask: '', align: 'center', name: 'rc170Cfop' },
    { caption: 'Quantidade', weight: 15, mask: 'valor3Dec', align: 'right', name: 'qtd' },
    { caption: 'Total do item', weight: 15, mask: 'valor2Dec', align: 'right', name: 'totItem' }
  ]



  ngOnInit(): void {

    this.resetarConfiguracoes();
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

  fVerificarData() {
    this.formulario.get("rc170DtMovFin")?.setValue(
      attribuiSeVazio(
        ultimoDiaDoAno(this.formulario.get("rc170DtMovIni")?.value),
        this.formulario.get("rc170DtMovFin")?.value
      )
    );
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

  fValorENomeDoCampoParaformatar(pValor: ProdutoXCfopModel, pNomeCampo: string) {
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
  changeEvent() {
    console.log('adionou changeevent ', new Date());
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;

    this.fBuscarTabelaBase("change event");
  }

  // inicio 

  fBuscarTabelaBase(origem: string) {

    this.isLoading = true;

    //    console.log("buscanco tabase base ", origem, " datahora ", new Date() )

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
    parametrosDados.nomeRelatorio = "ProdutoXCfop";

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




    this.produtoXCfopService.produtoXCfopGet(parametrosDados)
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



  // termino




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

  fBuscarPlanilha() {



    this.tipoEvento = "Gerando Planilha...";

    this.isLoading = true;

    this.tipoEvento = "Carregando dados...";





    let parametrosDados: ParametrosDados = {};

    parametrosDados = this.fAtualizarFiltrosRel();

    parametrosDados.nomeRelatorio = "ProdutoXCfoPlanilha"






    this.produtoXCfopService.produtoXCfopPlanilha(parametrosDados)
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


  fBuscarRelatorio() {

    this.tipoEvento = "Gerando Relatorio...";



    this.tipoEvento = "Carregando dados...";
    this.mDisableGerar = true;
    this.showLoading();

    this.fAdicionarFiltros();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "produtoXCfopRelatorio"

    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "produtoXCfopRelatorio";
    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);



  }

fAdicionarFiltros() {
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


}
  cancelarESair() {
    if (this.session.companyId == "0") {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/page/home']);
    }

  }


  fAtualizarBusca2(event: CamposParaFiltros) {
    this.pesquisarPorcampoParaFiltro = event;
    this.filterPaginator.page = 0;

    this.fBuscarTabelaBase("");
  }

  fAtualizarBusca() {
    this.filterPaginator.page = 0;
    this.fBuscarTabelaBase("");
  }


  resetarConfiguracoes() {
    console.log(' evento 1095 ')
    this.fBuscarTableFilpad();
  }


  fAjustarDisplayColumnsTable() {

    this.fAtualizarTable(this.dataSourceTableFilpadCab);
    this.fBuscarTabelaBase("");
    //  console.log('atualizando os tables  qtd reg ', this.dataSourceTableFilpadCampos.data.length)
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




  }

  baixarRelatorio() {

    this.tipoEvento = "Gerando Relatorio...";



    this.tipoEvento = "Carregando dados...";
    this.mDisableGerar = true;
    this.showLoading();

    this.filtrosGenericosLista = [];

    this.fAdicionarFiltros();





    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.nomeRelatorio = "produtoXCfopRelatorio"

    parametrosDados.separadoPor = "";
    parametrosDados.tipoRelatorio = "PDF";
    parametrosDados.origemRelatorio = "produtoXCfopRelatorio";
    this.baixarArquivosService.downloadDocumentoPost(parametrosDados);
//    parametrosDados.orderFields = this.fPegarOrderFieldsRelatorio(this.dataSourceTableFilpadCab.cadTableFilpadCampos!);






  }


  onDblClick(pValor: MovimentoProdServModel, pNomeCampo: string) {

    const mValor: any = (pValor as any)[pNomeCampo];

    //console.log('nome do campo ' + pNomeCampo + ' p valor ' + mValor);
    // this.snotifyService.warning('nome do campo ' + pNomeCampo + ' p valor ' + mValor);



    const dialogRef = this.dialog.open(ProdutoXCfopDetalhesComponent, {
      disableClose: true,
      panelClass: 'app-no-padding-dialog',
      width: '80%'
      ,
      data: {
        idPessoa: this.session.companyId,
        codItem: pValor.rc170CodItem,
        cfop: pValor.rc170Cfop,


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

// inicio


  fBuscarTableFilpad() {



    this.showLoading();
    this.tipoEvento = "Carregando dados...";


    this.filtrosGenericosLista = [];




    this.filtrosGenericosLista = new
      AdicionarFiltrosGenericos(this.filtrosGenericosLista, "rc170IdPessoa", "=", this.session.companyId,
        2, getRelacionarCondicao()[0].id).adicionarfiltros();




    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;




    this.genericosService.buscarDadosGenericos("produtoXCfopCamposParaFiltrosCustomizados"
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

            this.fBuscarTabelaBase("");
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



  fAtualizarFiltros(cadTableFilpadCabModelPar: CadTableFilpadCabModel) {
    this.fAtualizarTable(cadTableFilpadCabModelPar);

  }

// inicio

  
// termino



}







