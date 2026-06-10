import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ProcessosExecutadosModel } from './model/processo-executadosModel';
import * as moment from 'moment';
import { ParseFloat } from '@base-shared/funcoesGerais/function-form';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-processos-executados',
  templateUrl: './processos-executados.component.html',
  styleUrls: ['./processos-executados.component.scss'],

})
export class ProcessosExecutadosComponent  implements OnInit {

  @Input() data: Array<any> = [];

  isMobile: boolean = false;
  displayedColumns: string[] = ['cpId', 'cpDatHorIni', 'cpDatHorTermino', 'cpNome'];
  dataSource = new MatTableDataSource<ProcessosExecutadosModel>();


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cd: ChangeDetectorRef) { }

  public profileForm: FormGroup;

  ngOnInit(): void {
    this.dataSource.data = [... this.data];
  }



  fillData(data: any[]) {
    this.dataSource.data = [...data];
    this.cd.detectChanges();

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

      console.log('erro ', error);
      return pValor;
    }
  }

}







