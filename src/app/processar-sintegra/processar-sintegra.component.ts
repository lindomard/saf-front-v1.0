import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CadArqMagneticoModel } from './model/CadArqMagneticoModel';
import { SelectionModel } from '@angular/cdk/collections';
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
import { VerificaFiltrosVazio } from '@base-shared/funcoesGerais/verificaFiltrosVazio';
import { CadGeraArquivosModel } from './model/CadGeraArquivosModel';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { GerarArqMagneticoSintegraComponent } from './gerar-arq-magnetico-sintegra/gerar-arq-magnetico-sintegra.component';
import { HistoricoGeracaoArquivosSintegraComponent } from './historico-geracao-arquivos-sintegra/historico-geracao-arquivos-sintegra.component';
import { ProcessarSintegraService } from './processar-sintegra.service';

@Component({
  selector: 'app-processar-sintegra',
  templateUrl: './processar-sintegra.component.html',
  styleUrls: ['./processar-sintegra.component.scss']
})
export class ProcessarSintegraComponent implements OnInit {

  filtrosGenericosLista: FiltrosGenericosModel[] = [];

  constructor( private snotifyService: SnotifyService
    , private session: SessionService
    , private router: Router
    , private fb: UntypedFormBuilder
    , private processarService: ProcessarSintegraService

  ) { }

  cadArqMagneticoModel: CadArqMagneticoModel[] = [];
  
  cadGeraArquivosModel: CadGeraArquivosModel[] = [];


  @ViewChild('instanceGerarArqMagneticosSintegra', { static: true }) instanceGerarArqMagneticosSintegra: GerarArqMagneticoSintegraComponent;
  @ViewChild('instanceGeraArquivosSintegra', { static: true }) instanceGeraArquivosSintegra: HistoricoGeracaoArquivosSintegraComponent;

  


  ngOnInit(): void {
    
  }



  processar() {

    this.instanceGerarArqMagneticosSintegra.processar();
    
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

      this.instanceGeraArquivosSintegra.fillData(this.cadGeraArquivosModel);
      

    })
  }, error => {
    this.snotifyService.error(error.error.message);
  }
  )

}


// termino


}
