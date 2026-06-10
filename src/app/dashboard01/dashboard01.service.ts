import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { ViaCepModel } from '@register/data/model/viacep.model';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { SnotifyService } from 'ng-snotify';
import { Response } from '@base-core/model/response.model';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { Dashboard01Model } from './model/dashboard01Model';
import { ProcessosExecutadosModel } from './processos-executados/model/processo-executadosModel';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';


@Injectable({
  providedIn: 'root'
})
export class Dasboard01Service {

  constructor(private api: ApiCreateHttpclienteService) {

  }



  BuscarDashboard01(parametrosDados: ParametrosDados): Observable<Dashboard01Model[]> {
    let url = "dashboard01";
    return this.api.post(url, parametrosDados);
  }

  BuscarProcessosExecutados(parametrosDados: ParametrosDados): Observable<ProcessosExecutadosModel[]> {
    let url = "processosExecutadosGetList";
    return this.api.post(url, parametrosDados);
  }

}



