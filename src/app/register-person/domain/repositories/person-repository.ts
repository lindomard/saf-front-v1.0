import { Observable } from 'rxjs';
import { Client } from '@register/data/model/client.model';
import { Page } from '@base-core/model/page.model';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { ClienteAll } from '../entities/cliente-entity.model';
import { ClienteSave } from '../usecase/register-use-case.service';
import { PersonResponse } from '@register/data/model/person-response.model';

export abstract class PersonRepository {

   abstract save(client: Client): Observable<ClienteSave>;

   abstract find(params: IRequestOptions): Observable<Page<ClienteAll>>;

   abstract findByCnpj(params: IRequestOptions): Observable<Page<ClienteAll>>;

   abstract findById(params: IRequestOptions): Observable<PersonResponse>

}
