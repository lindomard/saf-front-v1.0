import { Injectable } from '@angular/core';
import { PersonRepository } from '../../domain/repositories/person-repository';
import { Client } from '../model/client.model';
import { Observable } from 'rxjs';
import { ApiCreateHttpclienteService, IRequestOptions } from 'src/app/base/base-core/build-request/api-create-httpcliente.service';
import { ClienteAll } from '@register/domain/entities/cliente-entity.model';
import { Page } from '@base-core/model/page.model';
import { ClienteSave } from '@register/domain/usecase/register-use-case.service';
import { PersonResponse } from '../model/person-response.model';

@Injectable()
export class RegisterPersonService extends PersonRepository {
  
  private readonly endpoint = 'cliente';

  constructor(
    private api: ApiCreateHttpclienteService
  ) {
    super();
  }

  save(cliente: Client): Observable<ClienteSave> {
    return this.api.post<ClienteSave>(this.endpoint, cliente);
  }

  find(params: IRequestOptions): Observable<Page<ClienteAll>> {
    const url = `${this.endpoint}/filter`
    return this.api.get<Page<ClienteAll>>(url, params);
  }

  findByCnpj(params: IRequestOptions): Observable<Page<ClienteAll>> {
    const url = `${this.endpoint}/search-cnpj`;
    return this.api.get<Page<ClienteAll>>(url, params);
  }

  findById(params: IRequestOptions): Observable<PersonResponse> {
    const url = `${this.endpoint}/search-id`;
    return this.api.get<PersonResponse>(url, params);
  }

}
