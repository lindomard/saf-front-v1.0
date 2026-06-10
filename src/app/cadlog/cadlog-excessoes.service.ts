import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { Page } from '@base-core/model/page.model';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { Observable } from 'rxjs';
import { CadlogexcessoesModel } from './model/CadlogexcessoesModel';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { Response } from '@base-core/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class CadlogExcessoesService {

  private readonly urlOauth = "oauth/token";

  constructor(private api: ApiCreateHttpclienteService) { }



  BuscarCadlogExcessoes(parametrosDados: ParametrosDados): Observable<Response> {


    let url = "cadlogExcessoesGetPage";

      return this.api.post<Response>(url, parametrosDados);
    }

}
