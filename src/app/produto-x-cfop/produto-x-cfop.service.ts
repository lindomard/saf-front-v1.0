import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';
import { Observable } from 'rxjs';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { Response } from '@base-core/model/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoXCfopService {

  constructor(private api: ApiCreateHttpclienteService) { }

  produtoXCfopGet(parametrosDados: ParametrosDados):
    Observable<Response> {
    let url = "produtoXCfopGet";
    return this.api.post<Response>(url, parametrosDados);
  }



  produtoXCfopPlanilha(parametrosDados: ParametrosDados): Observable<Response> {

    let url = "produtoXCfopPlanilha";

    return this.api.post<Response>(url, parametrosDados);
  }




}
