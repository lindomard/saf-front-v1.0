import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { Observable } from 'rxjs';
import { Response } from '@base-core/model/response.model';
import { Cadrc170AtualizarModel } from './model/Cadrc170AtualizarModel ';

@Injectable({
  providedIn: 'root'
})
export class RetaguardaVisualizarResultadosService {



  constructor(private api: ApiCreateHttpclienteService) { }


  BuscarResultadosPage(parametrosDados: ParametrosDados):
    Observable<Response> {
    let url = "cadConclusaoGet";
    return this.api.post<Response>(url, parametrosDados);
  }


  CadConclusaoPlanilha(parametrosDados: ParametrosDados):
    Observable<Response> {
    let url = "cadConclusaoPlanilha";
    return this.api.post<Response>(url, parametrosDados);
  }


  BuscarMovimentoProdServPage(parametrosDados: ParametrosDados):
    Observable<Response> {
    let url = "movimentoProdServGet";
    return this.api.post<Response>(url, parametrosDados);
  }


  VisualizarDanfePegarLink(parametrosDados: ParametrosDados):
    Observable<Response> {
    let url = "visualizarDanfePegarLink";
    return this.api.post<Response>(url, parametrosDados);
  }


  salvarcadrc170Ajustar(cadrc170AtualizarModel: Cadrc170AtualizarModel): Observable<Response> {

    let url = "cadrc170AjustarResultados";
    return this.api.put(url, cadrc170AtualizarModel);

  }


}
