import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { SessionService } from '@base-core/session/session.service';
import { HttpClient } from '@angular/common/http';
import { FilterPaginator } from '@base-core/state/filter-paginator';
import { Page } from '@base-core/model/page.model';
import { TabelaBaseC100Model } from './model/TabelaBaseModel';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { Response } from '@base-core/model/response.model';


@Injectable({
  providedIn: 'root'
})

export class Cadrc100ConsultaService {


  private readonly urlOauth = "oauth/token";


  constructor(private api: ApiCreateHttpclienteService,
    private session: SessionService,
     private http: HttpClient) {

  }






  BuscarTabelaBasePage(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "tabelaBaseGet";

      return this.api.post<Response>(url, parametrosDados);
    }
   

  
}



