import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtToken } from '@base-core/model/jwt-token';
import { UserEntity } from '@sign/domain/entity/user-entity';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CadastrarPessoaComponent } from './cadastrar-pessoa/cadastrar-pessoa.component';
import { CadpessoasSimplificadoModel } from './model/CadpessoasSimplificadoModel';
import { Response } from '@base-core/model/response.model';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';

@Injectable({
  providedIn: 'root'
})
export class TelaAberturaService {

  private readonly urlOauth = "sistema/login";

  constructor(private http: HttpClient,
    private api: ApiCreateHttpclienteService) { }



  login(body: UserEntity): Observable<JwtToken> {

    const url = `${environment.url}${this.urlOauth}`
    let mBody: any = {
      username: body.username,
      password: body.password,
      companyId: body.company
    };
    return this.http.post<JwtToken>(url, mBody, { headers: this.httpOptions, withCredentials: true })
  }

  cadastrarPessoa(cadastropessoaSimplificadoModel: CadpessoasSimplificadoModel): Observable<Response> {


//    const url = `${environment.url}cadPessoasSimplificado`
    
    return this.api.put<Response>("cadPessoasSimplificado", cadastropessoaSimplificadoModel);
  }

  private readonly httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
   // 'Authorization': 'Basic Z2VuZXNpc19wal9nZWg6Z2VuZXNpc19wal9nZWg='
  })

  mapFrom(param: UserEntity): String {
    return `username=${param.username}&password=${param.password}&grant_type=password&company_id=${param.company}`;
  }

}
