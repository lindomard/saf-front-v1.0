import { Injectable } from '@angular/core';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { Observable } from 'rxjs';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Response } from '@base-core/model/response.model';
import { HttpClient, HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ParametrosDados } from './model/CamposParaFiltros';
import { CadTableFilpadCabModel } from '../genericos/model/CadTableFilpadCabModel';

@Injectable({
  providedIn: 'root'
})
export class DadosComunsService {


  constructor(private api: ApiCreateHttpclienteService) { }





  CadtableFilpadSalvar(cadTableFilpadCabModel: CadTableFilpadCabModel): Observable<Response> {
    let url = "cadTableFilpadCabSaveUpdate";
    return this.api.put(url, cadTableFilpadCabModel);
  }

  CadRelPadOrigemCadtableFilpadSalvar(cadTableFilpadCabModel: CadTableFilpadCabModel): Observable<Response> {
    let url = "cadrelpadOrigemCadTableCabSaveUpdate";
    return this.api.put(url, cadTableFilpadCabModel);
  }

  CadRelpadDeletar(pId: number): Observable<Response> {
    let url = "cadrelpadCabDelete/"+pId;
    return this.api.delete(url);
  }


}
