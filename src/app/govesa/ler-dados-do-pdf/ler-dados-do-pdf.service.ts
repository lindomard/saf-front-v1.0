import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Response } from '@base-core/model/response.model';
import { Observable } from 'rxjs';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';

@Injectable({
  providedIn: 'root'
})
export class LerDadosDoPdfService {

  constructor(private api: ApiCreateHttpclienteService) { }


  BuscarResultadosPage(parametrosDados:  ParametrosDados):
  Observable<Response> {
   let url = "govesaSaidasEntradasCabGetList";
   return this.api.post<Response>(url, parametrosDados);
   }
 


}
