import { Injectable } from '@angular/core';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { Observable } from 'rxjs';
import { Response } from '@base-core/model/response.model';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';

@Injectable({
  providedIn: 'root'
})
export class DocModalService {

  constructor(
    private api: ApiCreateHttpclienteService

  ) { }


  BuscarDoc(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "tabelaBaseGet";

      return this.api.post<Response>(url, parametrosDados);
    }


}
