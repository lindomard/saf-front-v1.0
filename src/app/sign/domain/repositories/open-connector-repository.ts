import { Observable } from 'rxjs';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';

export abstract class OpenconnectorRepository {

    abstract openConnector(params: IRequestOptions): Observable<string>;
}