import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CadlogexcessoesModel } from '../model/CadlogexcessoesModel';
import { MatPaginator } from '@angular/material/paginator';
import * as moment from 'moment';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { ParseFloat } from '@base-shared/funcoesGerais/function-form';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { SnotifyService } from 'ng-snotify';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { SessionService } from '@base-core/session/session.service';
import { CadlogExcessoesService } from '../cadlog-excessoes.service';
import { safeCall } from '@base-core/safe-call';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-cadlog-excessoes',
  templateUrl: './cadlog-excessoes.component.html',
  styleUrls: ['./cadlog-excessoes.component.scss']
})
export class CadlogExcessoesComponent implements OnInit {

  constructor(
    private cadlogExcessoesService: CadlogExcessoesService,
    private snotifyService: SnotifyService
    , public dialogRef: MatDialogRef<CadlogExcessoesComponent>
    , @Inject(MAT_DIALOG_DATA) public dados: any,

    
    ) { }

  dataSourceWithPageSize = new MatTableDataSource<CadlogexcessoesModel>([]);
  @ViewChild(MatPaginator) paginatorPageSize: MatPaginator;
  filterPaginator: FilterPaginator = {};

  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  pageLimitOptions: Array<number> = [2, 5, 10, 20];

  displayedColumns = [
    'leId',
    'leDathor',
    'leCodprocvinculado',
    'cpNome',
    'leResultado',
    'leObservacoes',
    'leComando'
  ]



  ngOnInit(): void {
    this.fBuscarCadlogExcessoes(this.dados.idPessoa)
  }


  fRetornaFormatado(pValor: any, pDataMask: string) {

    try {


      if (pValor == null || pDataMask == null) {
        return pValor;
      }


      let mValor: string = pDataMask.toLowerCase();
      switch (mValor) {
        case 'valorboolean':
          return pValor == 1 ? "SIM" : "NAO";

        case 'datetime':
          return moment(pValor).format('DD/MM/YYYY HH:mm:ss');
        case 'date':
          return moment(pValor).format('DD/MM/YYYY');
        case 'cnpj':
          return FuncoesGerais.fMascaracpfCnpj(pValor);
        case 'valor2dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 2);
        case 'valor3dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 3);
        case 'valor4dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 4);

        default:


          return pValor;
      }


    } catch (error) {

      return pValor;
    }
  }

  changeEvent() {
    this.filterPaginator.page = this.paginatorPageSize.pageIndex;
    this.filterPaginator.size = this.paginatorPageSize.pageSize;
    this.fBuscarCadlogExcessoes(this.dados.idPessoa);

  }


  fBuscarCadlogExcessoes(idPessoa: number) {




    this.filtrosGenericosLista = [];

    this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "leIdPessoa", "=", idPessoa.toString(),0,"").adicionarfiltros();

    

    this.filterPaginator.page=(this.filterPaginator.page==undefined ? 0 : this.filterPaginator.page);
    this.filterPaginator.size=(this.filterPaginator.size==undefined ? 5 : this.filterPaginator.size);

    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;
    parametrosDados.page = this.filterPaginator.page;
    parametrosDados.size = this.filterPaginator.size;



    this.cadlogExcessoesService.BuscarCadlogExcessoes(parametrosDados)
      .subscribe((Response) => {
        safeCall(Response.objeto, (cadlogexcessoesModel) => {
          this.dataSourceWithPageSize.data = [...cadlogexcessoesModel.content];


          this.filterPaginator.page = cadlogexcessoesModel.pageable.pageNumber;
          this.filterPaginator.size =  cadlogexcessoesModel.pageable.pageSize;
          this.filterPaginator.totalElements = cadlogexcessoesModel.totalElements;
          this.filterPaginator.totalPages = cadlogexcessoesModel.totalPages;
      

          this.dataSourceWithPageSize.data.forEach( (c100)=> {
            console.log("c100 ", c100.cpNome, c100.leId);

          })

//          this.dataSourceWithPageSize.data = [...CadArqMagneticoModel.content];

        })
      }, error => {
        this.snotifyService.error(error.error.message);
      }
      )


  }

  fechar() {
    this.dialogRef.close();

  }



}
