import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CadArqMagneticoModel } from '../model/CadArqMagneticoModel';
import { MatPaginator } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { VerificaFiltrosVazio } from '@base-shared/funcoesGerais/verificaFiltrosVazio';
import { CadGeraArquivosModel } from '../model/CadGeraArquivosModel';
import { ProcessarService } from '../processar.service';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { safeCall } from '@base-core/safe-call';
import { SnotifyService } from 'ng-snotify';
import * as moment from 'moment';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-historico-geracao-arquivos',
  templateUrl: './historico-geracao-arquivos.component.html',
  styleUrls: ['./historico-geracao-arquivos.component.scss']
})
export class HistoricoGeracaoArquivosComponent implements OnInit {

  @Input() data: Array<any> = [];

  mDisableBaixar= false;

  isMobile: boolean = false;
  displayedColumns: string[] = ['gaDtIni', 'gaDtFin', 'gaDhInicio', 'gaDhTermino','baixar'];
  dataSource = new MatTableDataSource<CadGeraArquivosModel>();

  filtrosGenericosLista: FiltrosGenericosModel[] = [];


  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private cd: ChangeDetectorRef
    , private processarService: ProcessarService
    , private snotifyService: SnotifyService
    
    ) { }

  public profileForm: FormGroup;

  ngOnInit(): void {
    this.dataSource.data = [... this.data];
  }



  fillData(data: any[]) {
    this.dataSource.data = [...data];
    this.cd.detectChanges();

  }



  fRetornaFormatado(pValor: any, pDataMask: string) {

    return FuncoesGerais.fRetornaFormatado(pValor, pDataMask)
  }


  BaixarArquivo(cadGeraArquivosModel: any) {

    let filtrosGenericosLista: FiltrosGenericosModel[] = [];
    let mNome: string = "efdIcms_"+ moment(cadGeraArquivosModel.gaDtIni).format('YYYYMM')+".txt";
    filtrosGenericosLista = new AdicionarFiltrosGenericos(filtrosGenericosLista, mNome  , "=", 
    cadGeraArquivosModel.gaNomeArquivo,0,"").adicionarfiltros();


    let parametrosDados: ParametrosDados = {};
    parametrosDados.filtrosGenericosList = filtrosGenericosLista;



    this.processarService.buscarArquivoPorNome(parametrosDados);
    
   


  }

}







