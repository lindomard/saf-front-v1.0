import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Response } from '@base-core/model/response.model';
import { ProcessosPendentesModel } from '@home/model/ProcessosPendentesModel';
import { Observable } from 'rxjs';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {

  constructor(private api: ApiCreateHttpclienteService) { }



  caddocResumidoGetList(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "cadDocResumidoGetList";
    return this.api.post(url, parametrosDados);
  }

  cadSitdocResumidoGetList(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "cadSitDocResumidoGetList";
    return this.api.post(url, parametrosDados);
  }

  getProcessosPendentes(pIdPessoa: string): Observable<ProcessosPendentesModel> {
    let url = "getProcessosPendentes";
    return this.api.post(url, pIdPessoa);
  }


}
