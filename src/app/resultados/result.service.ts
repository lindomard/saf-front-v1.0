import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { Response } from '@base-core/model/response.model';
import { SessionService } from '@base-core/session/session.service';
import { Observable } from 'rxjs';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private api: ApiCreateHttpclienteService
        , private session: SessionService
    ) { }



  caddocResumidoGetList(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "cadDocResumidoGetList";
    return this.api.post(url, parametrosDados);
  }

  cadSitdocResumidoGetList(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "cadSitDocResumidoGetList";
    return this.api.post(url, parametrosDados);
  }

  cadefdsemxmlGetList(parametrosDados: ParametrosDados): Observable<Response> {
    let url = "cadefdsemxmlGetList";
    return this.api.post(url, parametrosDados);
  }



  BuscarCadEfdSemXmlPlanilhas(parametrosDados:  ParametrosDados): Observable<Response> {



    let url = "cadefdsemxmlPlanilha";

    return this.api.post<Response>(url, parametrosDados);
   }


  


}
