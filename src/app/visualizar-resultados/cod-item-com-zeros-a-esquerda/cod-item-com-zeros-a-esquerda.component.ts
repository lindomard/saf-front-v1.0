import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cadr0200ZeroEsquerdaModel } from '../model/Cadr0200ZeroEsquerdaModel';
import { MatPaginator } from '@angular/material/paginator';
import { SessionService } from '@base-core/session/session.service';
import { SnotifyService } from 'ng-snotify';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { VisualizarResultadosService } from '../visualizar-resultados.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { safeCall } from '@base-core/safe-call';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { getCondicoesNumeroDataArray, getCondicoesStringArray, getRelacionarCondicao } from '@base-shared/funcoesGerais/funcoesDiversas';
import { CamposParaFiltros, ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-cod-item-com-zeros-a-esquerda',
  templateUrl: './cod-item-com-zeros-a-esquerda.component.html',
  styleUrls: ['./cod-item-com-zeros-a-esquerda.component.scss']
})
export class CodItemComZerosAEsquerdaComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, { static: false }) viewPort: 
  CdkVirtualScrollViewport;
  
//  public tipoRelacionarCondicao = [];

  constructor(
    private session: SessionService
    , private snotifyService: SnotifyService
    , private visualizarResultadosservice: VisualizarResultadosService
    ,  public dialogRef: MatDialogRef<CodItemComZerosAEsquerdaComponent>,
     @Inject(MAT_DIALOG_DATA) public dados: any,

  ) {this.dialogRef.disableClose = true; }

  dataSourceWithPageSize = new MatTableDataSource<Cadr0200ZeroEsquerdaModel>([]);
  
  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;

  filtrosGenericosLista: FiltrosGenericosModel[] = [];
  camposDaTabela = [];
  displayedColumns = ['r0200zeCodOriginal','r0200zeCodSemZeroEsq','r0200zeDescMenor'
  ,'r0200zeUndMenor','r0200zeDescMaiorcampo'
  ,'r0200zeUndMaior','r0200zeQtdOcor','Visualizar']

condicoesNumeroData =  getCondicoesNumeroDataArray();
condicaoString = getCondicoesStringArray() ;
tipoRelacionarCondicao = getRelacionarCondicao()




  filtroSelecionado: any;
  tipoFiltro: String;                   
  pageLimitOptions: Array<number> = [2, 5, 10, 15, 20,100];

  mDisableGerar = false;
  filterPaginator: FilterPaginator = {};

  tipoAcaoName: String = "Resumo dos Produtos com Zeros a Esquerda";

  tipoEvento: String = "Carregando dados...";
  itemSize = 15;
  itemSize2 = 10;
  
  dataSourceFiltros = new MatTableDataSource<CamposParaFiltros>();
  

  ngOnInit(): void {

    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;

    this.filterPaginator.page = 0;
    this.filterPaginator.size = 15;
    this.filterPaginator.totalElements = 0;
    this.filterPaginator.totalPages = 0;

    this.preencherDados();
    this.fBuscarTabelaBase();

    //this.tipoRelacionarCondicao = getRelacionarCondicao();

  }



  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;
    this.itemSize = this.filterPaginator.size;
    this.fBuscarTabelaBase();
  }

  fPegarFiltroId(pArray: any, pNome: String) {
    let index = pArray.findIndex(o => o.name === pNome);
    return pArray[index].id;

  }




fAdicionarFiltros() {
    this.dataSourceFiltros.data.forEach( filtro=> {
      this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, 
        this.fPegarFiltroId(this.camposDaTabela,filtro.nomeDoCampo)
        ,this.fPegarFiltroId(this.condicaoString,filtro.condicao)
        ,filtro.valor
        ,filtro.grupoFiltro
        ,this.fPegarFiltroId(this.tipoRelacionarCondicao,filtro.relacionarCondicao)
		
		).adicionarfiltros();


    } )
  }


/*
  fAdicionarFiltros() {
    this.dataSourceFiltros.data.forEach( filtro=> {
      this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, 
        this.fPegarFiltroId(this.camposDaTabela,filtro.nomeDoCampo)
        ,this.fPegarFiltroId(this.condicaoString,filtro.condicao)
        ,filtro.valor
        ,filtro.grupoFiltro
        ,this.fPegarFiltroId(this.tipoRelacionarCondicao, filtro.relacionarCondicao).adicionarfiltros();


    } )
  }


fAdicionarFiltros() {
    this.dataSourceFiltros.data.forEach( filtro=> {
      this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, 
        this.fPegarFiltroId(this.camposDaTabela,filtro.nomeDoCampo)
        ,this.fPegarFiltroId(this.condicaoString,filtro.condicao)
        ,filtro.valor
        ,filtro.grupoFiltro,filtro.relacionarCondicao).adicionarfiltros();


    } )
  }

*/

fAtualizarBusca() {
  this.filterPaginator.page = 0;
  this.fBuscarTabelaBase();
}



  fBuscarTabelaBase() {
    this.tipoEvento = "Carregando dados...";



    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new 
    AdicionarFiltrosGenericos(this.filtrosGenericosLista, "r0200zeIdPessoa", "=", this.session.companyId,
    1, getRelacionarCondicao()[0].id ) .adicionarfiltros();
    this.fAdicionarFiltros();

    


    
    let parametrosDados: ParametrosDados = {}
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;

    this.visualizarResultadosservice.BuscarCadr0200ZeroEsquerdaPage( parametrosDados, this.filterPaginator)
      .subscribe((Cadr0200ZeroEsquerdaModel) => {
        safeCall(Cadr0200ZeroEsquerdaModel, () => {
          this.dataSourceWithPageSize.data = [...Cadr0200ZeroEsquerdaModel.content];


          this.filterPaginator.page = Cadr0200ZeroEsquerdaModel.pageable.pageNumber;
          this.filterPaginator.size =  Cadr0200ZeroEsquerdaModel.pageable.pageSize;
          this.filterPaginator.totalElements = Cadr0200ZeroEsquerdaModel.totalElements;
          this.filterPaginator.totalPages = Cadr0200ZeroEsquerdaModel.totalPages;
          

          this.itemSize = this.filterPaginator.size;
          this.tipoEvento = "Navegando...";
      


        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }
      )


  }


  BaixarArquivo(cadr0200ZeroEsquerdaModel: Cadr0200ZeroEsquerdaModel) {


    this.snotifyService.warning("Opção ainda não disponivel");
    


  }


  cancelarESair() {
    this.dialogRef.close();

  }

  preencherDados() {
    this.camposDaTabela = [
      { id: 'r0200zeCodOriginal', name: 'Código Original', type: 'String' },
      { id: 'r0200zeCodSemZeroEsq', name: 'Código sem Zero a Esquerda', type: 'String' },
      { id: 'r0200zeDescMenor', name: 'Descrição Menor', type: 'String' },
      { id: 'r0200zeUndMenor', name: 'Unidade Menor', type: 'String' },
      { id: 'r0200zeDescMaiorcampo', name: 'Descrição Maior', type: 'String' },
      { id: 'r0200zeUndMaior', name: 'Unidade Maior', type: 'String' },
      { id: 'r0200zeQtdOcor', name: 'Quantidade de Ocorrencias', type: 'number' }
    ];


  }
  
}
