import { Injectable } from '@angular/core';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { Observable } from 'rxjs';
import { CadfilpadModel } from './model/CadfilpadModel';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Response } from '@base-core/model/response.model';
import { HttpClient, HttpEventType, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { WhatsAppResponseModel } from './model/WhatsAppResponseModel';
import { WhatsAppEnviarTextoRequestModel } from './model/WhatsAppEnviarTextoRequestModel';
import { WhatsAppQrCodeTextResponseModel } from './model/WhatsAppQrCodeTextoResponseModel';
import { map } from 'rxjs/operators';
import { ParametrosDados } from '../dados-comuns/model/CamposParaFiltros';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {


  pathUplod = 'cadpessoas/files';

  constructor(private api: ApiCreateHttpclienteService) { }



  CadfilpadGetList(parametrosDados: ParametrosDados): Observable<CadfilpadModel[]> {
    let url = "cadfilpadGetList";
    return this.api.post(url, parametrosDados);
  }


  CadfilpadSalvar(cadfilpadModel: CadfilpadModel): Observable<Response> {
    let url = "cadfilpadSaveUpdate";
    return this.api.put(url, cadfilpadModel);
  }

  CadfilpadSalvarAll(cadfilpadModel: CadfilpadModel[]): Observable<Response> {
    let url = "cadfilpadSaveAllUpdate";
    return this.api.put(url, cadfilpadModel);
  }

  WhatsAppTerminarSession(pSessionId: string): Observable<WhatsAppResponseModel> {
    let url = "whatsAppFecharSession/"+pSessionId ;
    return this.api.get(url);
  }

  WhatsAppStatusSession(pSessionId: string): Observable<WhatsAppResponseModel> {
    let url = "whatsAppStatusSession/"+pSessionId ;
    return this.api.get(url);
  }

  WhatsAppStartSession(pSessionId: string): Observable<WhatsAppResponseModel> {
    let url = "whatsAppStartSession/"+pSessionId ;
    return this.api.get(url);
  }

  WhatsAppQrCodeText(pSessionId: string): Observable<WhatsAppQrCodeTextResponseModel> {
    let url = "whatsAppQrCodeText/"+pSessionId ;
    return this.api.get(url);
  }

  WhatsAppSendMessage(pSessionId: string, whatsAppEnviarTextoRequestModel: WhatsAppEnviarTextoRequestModel): Observable<WhatsAppResponseModel> {
    let url = "whatsAppSendMessage/"+pSessionId ;
    return this.api.post(url,whatsAppEnviarTextoRequestModel);
  }


// inicio


WhatsAppSendFiles(pSessionId: string, formData: FormData): Observable<any> {
  //    let mIdcliente = 0;
  
  //    const url = `${environment.url}${this.pathUplod}`;
      const url = `${this.pathUplod}`;
        //return this.api.postFile<any>(Url, object);
  
      return this.api.postFile<any>(url, formData).pipe(
        map(event => {
  //        console.log(`type event = ${event.type}`);
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round(100 * event.loaded / event.total);
              return { status: 'progress', message: progress };
            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        })
      )
    }
  

// termino

/*
  WhatsAppSendFiles(pSessionId: string, files: File[]): boolean {

    
    let url = "whatsAppSendMessage/"+pSessionId ;
    //return this.api.post(url,whatsAppEnviarTextoRequestModel);
    return true;
  }
*/
}
