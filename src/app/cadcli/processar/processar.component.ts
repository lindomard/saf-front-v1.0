import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CadArqMagneticoModel } from './model/CadArqMagneticoModel';
import { SelectionModel } from '@angular/cdk/collections';
import { ProcessarService } from './processar.service';
import { SessionService } from '@base-core/session/session.service';
import { safeCall } from '@base-core/safe-call';
import { SnotifyService } from 'ng-snotify';
import * as moment from 'moment';
import { ParseFloat } from '@base-shared/funcoesGerais/function-form';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { Router } from '@angular/router';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { AdicionarFiltrosGenericos } from '@base-shared/funcoesGerais/adicionarFiltrosGenericos';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { GerarArqMagneticoComponent } from './gerar-arq-magnetico/gerar-arq-magnetico.component';
import { VerificaFiltrosVazio } from '@base-shared/funcoesGerais/verificaFiltrosVazio';
import { CadGeraArquivosModel } from './model/CadGeraArquivosModel';
import { HistoricoGeracaoArquivosComponent } from './historico-geracao-arquivos/historico-geracao-arquivos.component';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Component({
  selector: 'app-processar',
  templateUrl: './processar.component.html',
  styleUrls: ['./processar.component.scss']
})
export class ProcessarComponent implements OnInit {

  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  constructor( private snotifyService: SnotifyService
    , private session: SessionService
    , private router: Router
    , private fb: UntypedFormBuilder
    , private processarService: ProcessarService

  ) { }

  cadArqMagneticoModel: CadArqMagneticoModel[] = [];
  
  cadGeraArquivosModel: CadGeraArquivosModel[] = [];


  @ViewChild('instanceGerarArqMagneticos', { static: true }) instanceGerarArqMagneticos: GerarArqMagneticoComponent;
  @ViewChild('instanceGeraArquivos', { static: true }) instanceGeraArquivos: HistoricoGeracaoArquivosComponent;

  


  ngOnInit(): void {
    
  }



  processar() {

    this.instanceGerarArqMagneticos.processar();
    
  }



  // inicio 




// inicio 


buscarProcessosArquivosGerados() {

  console.log('buscar processos foi acionado ', 73 )


  this.filtrosGenericosLista = new AdicionarFiltrosGenericos(this.filtrosGenericosLista, "gaIdPessoa", "=",
  this.session.companyId.toString(),0,"").adicionarfiltros();

  this.filtrosGenericosLista = new VerificaFiltrosVazio(this.filtrosGenericosLista).fVerificaFiltrosVazio();


  let parametrosDados: ParametrosDados = {};
  parametrosDados.filtrosGenericosList = this.filtrosGenericosLista;

  this.processarService.buscarCadGeraArquivos(parametrosDados).subscribe((cadGeraArquivosModel) => {
    safeCall(cadGeraArquivosModel, () => {
      this.cadGeraArquivosModel = cadGeraArquivosModel;

      this.instanceGeraArquivos.fillData(this.cadGeraArquivosModel);
      

    })
  }, error => {
    this.snotifyService.error(error.error.message);
  }
  )

}


// termino


}
