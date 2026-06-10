import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { Observable } from 'rxjs';
import { Response } from '@base-core/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class CadpcoUnitarioAnualService {

  constructor(private api: ApiCreateHttpclienteService) { }

  cadpcoUnitarioAnualGet(parametrosDados: ParametrosDados):
    Observable<Response> {
    let url = "cadpcoUnitarioAnualGet";
    return this.api.post<Response>(url, parametrosDados);
  }

  cadpcoUnitarioAnualPlanilha(parametrosDados: ParametrosDados): Observable<Response> {

    let url = "cadpcoUnitarioAnualPlanilha";

    return this.api.post<Response>(url, parametrosDados);
  }


  BuscarResultadosPage(parametrosDados: ParametrosDados):
    Observable<Response> {
    let url = "cadpcoUnitarioAnualInventarioGet";
    return this.api.post<Response>(url, parametrosDados);
  }


}
