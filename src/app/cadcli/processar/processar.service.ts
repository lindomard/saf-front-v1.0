import { EventEmitter, Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { ProgressBarShowComponent } from '@base-shared/progress-bar-full/progress-bar-show.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpMensage } from '@base-shared/funcoesGerais/function-form';
import { ViaCepModel } from '@register/data/model/viacep.model';
import { FuncoesGerais } from '@base-shared/funcoesGerais/funcoes';
import { SnotifyService } from 'ng-snotify';
import { Response } from '@base-core/model/response.model';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { CadArqMagneticoModel } from './model/CadArqMagneticoModel';
import { RespostaComMensagemModel } from '@base-core/model/RespostaComMensagemModel';
import { CadGeraArquivosModel } from './model/CadGeraArquivosModel';
import { environment } from 'src/environments/environment';
import { SessionService } from '@base-core/session/session.service';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { JwtToken } from '@base-core/model/jwt-token';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';


@Injectable({
  providedIn: 'root'
})

export class ProcessarService {

  static terminouProcesso = new EventEmitter<boolean>();


  private readonly urlOauth = "oauth/token";


  constructor(private api: ApiCreateHttpclienteService,
    private session: SessionService,
     private http: HttpClient) {

  }



  BuscarArqMagneticos(pIdPessoa: string): Observable<CadArqMagneticoModel[]> {
    let url = "cadArqMagneticosGetList?pIdPessoa="+pIdPessoa;
    return this.api.get(url);
  }


  gerarArqMagneticos(pUrl: string, parametrosDados: ParametrosDados): Observable<RespostaComMensagemModel> {
  
//    let url = "gerarEfdIcms";
    return this.api.post(pUrl,parametrosDados);
  }

  buscarCadGeraArquivos(parametrosDados: ParametrosDados): Observable<CadGeraArquivosModel[]> {
    let url = "cadGerarArquivos";
    return this.api.post(url,parametrosDados);
  }


  private refresToken(): Observable<JwtToken> {
    let body = `grant_type=refresh_token`
    return this.http.post<JwtToken>(
      `${environment.url}${this.urlOauth}`, body, { headers: this.httpOptions, withCredentials: true }
    )
  }

  private readonly httpOptions = new HttpHeaders({
          'Content-Type': 'application/json',
    'Authorization': 'Basic Z2VuZXNpc19wal9nZWg6Z2VuZXNpc19wal9nZWg='

  });



  private buildRequest<T>(fn: Function): Observable<T> {
    if (this.session.isTokenExpired()) {
      const obsAccessToken = this.refresToken()
        .toPromise()
        .then((token: JwtToken) => {
          this.session.setJwtLocalStorage(token)
          return fn().toPromise();
        }
        )
      return from(obsAccessToken);
    } else {
      return fn();
    }
  }

  fAcionarEvento() {
        ProcessarService.terminouProcesso.emit(true)
  }

  buscarArquivoPorNome(parametrosDados: ParametrosDados) {
      
    let url: string = `${environment.url}` +"baixarArquivoPorNome";
  
      var xhr = new XMLHttpRequest();
  
  
      let accessToken = this.session.getJwt().access_token;
      var token = "Bearer " + accessToken;
  
      xhr.open("POST", url, true);
  
      //    console.log("url ", url);
  
      xhr.setRequestHeader("Authorization", token);
      xhr.setRequestHeader("Content-Type", "application/json")
  
  
  
      xhr.responseType = "blob";
      let mOrdemArq = 0;
  
      for (let i = 0; i < 3; i++) {
  
  
        xhr.onload = function (e) {
  
          if (this.status == 200) {
            const blob = this.response;
            const a = document.createElement("a");
            document.body.appendChild(a);
            const blobUrl = window.URL.createObjectURL(blob);
            a.href = blobUrl;
            a.download =  parametrosDados.filtrosGenericosList[mOrdemArq].nomeDoCampo.toString();
            mOrdemArq++;
  
  
            a.click();
            setTimeout(() => {
              window.URL.revokeObjectURL(blobUrl);
              document.body.removeChild(a);
  
            }, 0);
  
            ftermina(event);
  
          } else {
            
            console.log("terminou o dowload");
  
          }
        };
  
      }
  
      function ftermina(event) {
        console.log("loaded " + ((event.loaded / event.total) * 100) + "%");
        console.log("terminou o dowload");
        ProcessarService.terminouProcesso.emit(true)
      }

      this.buildRequest(() => xhr.send(JSON.stringify(parametrosDados)));

    }
  
}



