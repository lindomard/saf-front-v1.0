import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService, IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { NomeDoArquivoGeradoModel } from '@base-core/model/nome-do-arquivo-gerado-model';
import { Response } from '@base-core/model/response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompararRegistrosC170Service {

  constructor(private api: ApiCreateHttpclienteService) { }



  comparar2BancosC170Planilha(pId01: number, pId02: number): Observable<Response> {



    let url = "comparar2BancosDadosC170";

    return this.api.get<Response>(url, this.getParams(pId01,pId02));


  }

  private getParams(pId01: number, pId02: number): IRequestOptions {
    return {
        params: new HttpParams()
            .append('pId01', pId01)
            .append('pId02', pId02)
    }
}



}
