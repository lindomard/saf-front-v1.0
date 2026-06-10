import { OpenconnectorRepository } from '@sign/domain/repositories/open-connector-repository';
import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService, IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';

@Injectable()
export class OpenConnectorRepositoryService extends OpenconnectorRepository{
    
    private readonly path = 'connector';

    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }
    
    openConnector(params: IRequestOptions): Observable<any> {
        return this.api.get<any>(this.path, params);
    }
}