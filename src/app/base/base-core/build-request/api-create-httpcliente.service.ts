import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtToken } from '../model/jwt-token';
import { SessionService } from '../session/session.service';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}


export function applicationHttpClienteCreator(
  http: HttpClient,
  session: SessionService,
  router: Router,
  snotify: SnotifyService
) {
  return new ApiCreateHttpclienteService(http, session, router, snotify);
}

export class ApiCreateHttpclienteService {

  private api = environment.url
  private apiImagerm = environment.urlImagem
  private readonly urlOauth = "oauth/token";

  constructor(
    private http: HttpClient,
    private session: SessionService,
    private router: Router,
    private snotify: SnotifyService
  ) { }

  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.buildRequest<T>(() => this.http.get<T>(`${this.api}${endPoint}`, this.setOptions(options)));
  }

  public post<T>(endPoint: string, param: Object, options?: IRequestOptions): Observable<T> {
    return this.buildRequest(() => this.http.post<T>(`${this.api}${endPoint}`, param, this.setOptions(options)));
  }


  public postFile<T>(endPoint: string, param: FormData): Observable<T> {
    return this.buildRequest(() => this.http.post<T>(`${this.api}${endPoint}`, param, {
      headers: this.setOptionsFile()
    }));
  }

  public postFileProgress<T>(endPoint: string, param: FormData): Observable<T> {
    return this.buildRequest(() => this.http.post<T>(`${this.api}${endPoint}`, param, {
      reportProgress: true, observe: 'events', headers: this.setOptionsFile()
    }));
  }

  public postFileImage<T>(endPoint: string, param: FormData): Observable<T> {

    return this.buildRequest(() => this.http.post<T>(`${this.apiImagerm}${endPoint}`, param, {
      headers: this.setOptionsFile()
    }));
  }


  public put<T>(endPoint: string, param?: Object, options?: IRequestOptions): Observable<T> {
    return this.buildRequest(() => this.http.put<T>(`${this.api}${endPoint}`, param, this.setOptions(options)))
  }

  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    return this.buildRequest(() => this.http.delete<T>(`${this.api}${endPoint}`, this.setOptions(options)))
  }

  private refresToken(): Observable<JwtToken> {
    try {

      let body
      if (environment.isCompanyId) {
        body = `grant_type=refresh_token&company_id=${this.session.companyId}&refresh_token=${this.session.getJwt().refresh_token}`
      } else {
        body = `grant_type=refresh_token&refresh_token=${this.session.getJwt().refresh_token}`
      }

      return this.http.post<JwtToken>(
        `${this.api}${this.urlOauth}`, body, { headers: this.httpOptions, withCredentials: true }
      )

    } catch (error) {
      return new Observable(null);
    }

  }

  private readonly httpOptions = new HttpHeaders({
          'Content-Type': 'application/json',
    'Authorization': environment.basic,
  });

  private httpOptionsAuthorization(accessToken: string) {
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
  }

  private setOptions(options: IRequestOptions): IRequestOptions {
    let accessToken = this.session.getJwt().access_token;
    if (options === undefined) {
      return { headers: this.httpOptionsAuthorization(accessToken) };
    } else {
      options.headers = this.httpOptionsAuthorization(accessToken);
      return options;
    }
  }

  private setOptionsFile(): HttpHeaders {
    let accessToken = this.session.getJwt().access_token;
    console.log('access token 123 ', accessToken)
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });
  }

  public fRenovarToken() {

    if (this.session.isTokenExpired()) {
      const obsAccessToken = this.refresToken()
        .toPromise()
        .then((token: JwtToken) => {
          this.session.setJwtLocalStorage(token);
        },
          error => {
            const errorResponse = (error as HttpErrorResponse);
            this.session.removeToken();
            this.session.removeDateExpired();
            this.router.navigate(['/login']);
            this.snotify.error('Sessão expirou!');
          }
        )
    }

  }



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
}
