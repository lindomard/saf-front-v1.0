import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { Response } from '@base-core/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class GenericosService {

  constructor(private api: ApiCreateHttpclienteService) { }


     buscarDadosGenericos(pUrl: string, parametrosDados:  ParametrosDados): Observable<Response> {

      return this.api.post<Response>(pUrl, parametrosDados);
      
     }


     
}
