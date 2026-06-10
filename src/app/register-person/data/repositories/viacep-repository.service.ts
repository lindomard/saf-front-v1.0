import { ViaCepRepository } from '@register/domain/repositories/viacep-repository';
import { Injectable } from '@angular/core';
import { IRequestOptions, ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { ViaCep } from '../model/viacep.model';

@Injectable()
export class ViaCepRepositoryService extends ViaCepRepository{
    
    private readonly endPoint = 'viacep';
    
    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }

    getCep(param: IRequestOptions): Observable<ViaCep> {
        return this.api.get<ViaCep>(this.endPoint, param);
    }
}