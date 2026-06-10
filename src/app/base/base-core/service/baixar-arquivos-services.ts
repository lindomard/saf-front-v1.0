import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCreateHttpclienteService, IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { MontarFiltros } from '@base-core/function/montar-filtros-para-chamada-api';
import { DadosParaBaixarRelatorios } from '@base-core/model/dados-para-baixar-relatorios';
import { FiltrosGenericosModel } from '@base-core/model/filtros-genericos-model';
import { JwtToken } from '@base-core/model/jwt-token';
import { Response } from '@base-core/model/response.model';
import { SessionService } from '@base-core/session/session.service';
import { SnotifyService } from 'ng-snotify';
import { from, Observable } from 'rxjs';
import { ParametrosDados } from 'src/app/dados-comuns/model/CamposParaFiltros';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaixarArquivosService {


  urlApi = environment.url;
  iRequestOptions: IRequestOptions = {}
  private readonly urlOauth = "oauth/token";

  constructor(private api: ApiCreateHttpclienteService
    , private session: SessionService
    , private http: HttpClient
    , private router: Router
    , private snotify: SnotifyService
  ) {
  }

  pathDownload: String = "downloadFile/";



  static terminouDownload = new EventEmitter<boolean>();

  static LimparCamposTabelasIncluir = new EventEmitter();









  private refresToken(): Observable<JwtToken> {
    let body = `grant_type=refresh_token`
    return this.http.post<JwtToken>(
      `${this.urlApi}${this.urlOauth}`, body, { headers: this.httpOptions, withCredentials: true }
    )
  }

  private readonly httpOptions = new HttpHeaders({
    
          'Content-Type': 'application/json',
    'Authorization': environment.basic



  });


  private buildRequest<T>(fn: Function): Observable<T> {
    if (this.session.isTokenExpired()) {
      const obsAccessToken = this.refresToken()
        .toPromise()
        .then((token: JwtToken) => {
          this.session.setJwtLocalStorage(token);
          return fn().toPromise();
        },
          error => {
            const errorResponse = (error as HttpErrorResponse);
            this.session.removeToken();
            this.session.removeDateExpired();
            this.router.navigate(['/login']);
            this.snotify.error('Sessão expirou!');
            return fn().toPromise();
          }
        )
      return from(obsAccessToken);
    } else {
      return fn();
    }
  }


  /*
    private buildRequest<T>(fn: Function): Observable<T> {
      if (this.session.isTokenExpired) {
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
  
  */
  // inicio baixar planilha

  downloadarquivo(pFilename: string) {
    let url: string = `${environment.url}${this.pathDownload}` + pFilename;

    var xhr = new XMLHttpRequest();



    let accessToken = this.session.getJwt().access_token;
    var token = "Bearer " + accessToken;




    //    console.log('url ', url);
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Authorization", token);


    xhr.responseType = "blob";
    xhr.onprogress
    xhr.onload = function (e) {
      if (this.status == 200) {
        const blob = this.response;

        const a = document.createElement("a");
        document.body.appendChild(a);

        const blobUrl = window.URL.createObjectURL(blob);
        a.href = blobUrl;
        a.download = pFilename;
        a.click();

        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);
        }, 0);
        ftermina(event);

      } else {
        BaixarArquivosService.terminouDownload.emit(false)
      }
    };

    function ftermina(event) {
      //      console.log("loaded " + ((event.loaded / event.total) * 100) + "%");

      BaixarArquivosService.terminouDownload.emit(((event.loaded / event.total) * 100) > 99.9 ? true : false)


    }

    xhr.send();


  }



  downloadDocumentoPost(parametrosDados: ParametrosDados) {

    let url: string = `${environment.url}` + parametrosDados.origemRelatorio;

    var xhr = new XMLHttpRequest();


    let accessToken = this.session.getJwt().access_token;
    var token = "Bearer " + accessToken;
    /*
    
        let mFiltros: string = "";
    
           mFiltros += MontarFiltros(mFiltros, "tipoRel", parametrosDados.tipoRelatorio);
        //    mFiltros += MontarFiltros(mFiltros, "nomeDocumento", dadosParaBaixarRelatorios.nomeDocumento);
        //    mFiltros += MontarFiltros(mFiltros, "origemRelatorio", dadosParaBaixarRelatorios.origemRelatorio);
    
        if (parametrosDados.separadoPor !== "Sem Separar") {
          mFiltros += MontarFiltros(mFiltros, "separadoPor", parametrosDados.separadoPor);
        }
    
    //    mFiltros += MontarFiltros(mFiltros, "camposParaFiltros", parametrosDados.camposParaFiltros);
    
    
    //    let mUrl = url + mFiltros;
    */
    let mUrl = url;


    let terminou: boolean = false;
    xhr.open("POST", mUrl, true);



    // console.log("url ", mUrl);


    xhr.setRequestHeader("Authorization", token);

    //    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    //    xhr.setRequestHeader("Authorization", environment.basic);
    xhr.setRequestHeader("Content-Type", "application/json")
    //'Content-Type': 'application/x-www-form-urlencoded',


    xhr.send(JSON.stringify(parametrosDados));


    xhr.responseType = "blob";
    xhr.onloadend = function (b) { terminou = true; }

    xhr.onload = function (e) {

      if (this.status == 200) {
        const blob = this.response;
        const a = document.createElement("a");
        document.body.appendChild(a);
        const blobUrl = window.URL.createObjectURL(blob);
        a.href = blobUrl;
        a.download = parametrosDados.nomeRelatorio + "." + parametrosDados.tipoRelatorio;

        //        console.log('chegou a passar arqui ', dadosParaBaixarRelatorios.nomeDocumento + "." + dadosParaBaixarRelatorios.tipoRel);

        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(blobUrl);
          document.body.removeChild(a);

        }, 0);

        ftermina(event);
      } else {
        BaixarArquivosService.terminouDownload.emit(true)

      }
    };
    function ftermina(event) {

      BaixarArquivosService.terminouDownload.emit(((event.loaded / event.total) * 100) > 99.9 ? true : false)


    }
    //    xhr.send(JSON.stringify(filtrosGenericos));
    //this.buildRequest(() => xhr.send(JSON.stringify(parametrosDados)));
  }

  buscarDadosPostGenerico(parametrosDados:  ParametrosDados, pUrl: string): Observable<Response> {

    let url = pUrl;
    return this.api.post<Response>(url, parametrosDados);
    
   }



}








