import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtToken } from 'src/app/base/base-core/model/jwt-token';
import { environment } from 'src/environments/environment';
import { SignInRepository } from '../../domain/repositories/sign-in-repository';

@Injectable()
export class SignInRepositoryService extends SignInRepository {

  private readonly urlOauth = "oauth/token";

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  signIn(body: string): Observable<JwtToken> {
    const url = `${environment.url}${this.urlOauth}`
    return this.http.post<JwtToken>(url, body, {headers: this.httpOptions, withCredentials: true})
  }

  private readonly httpOptions = new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded',
    'Authorization' : 'Basic Z2VuZXNpc19wal9nZWg6Z2VuZXNpc19wal9nZWg='
  })

}
