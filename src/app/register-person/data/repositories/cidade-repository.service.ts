import { CidadeRepository } from '@register/domain/repositories/cidade-repository';
import { Injectable } from '@angular/core';
import { IRequestOptions, ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Page } from '@base-core/model/page.model';
import { Cidade } from '@register/data/model/cidade.model';
import { Observable } from 'rxjs';

@Injectable()
export class CidadeRepositoryService extends CidadeRepository {
    
    private readonly path = 'cidade';

    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }

    getAll(param: IRequestOptions): Observable<Page<Cidade>> {
        return this.api.get<Page<Cidade>>(this.path, param);
    }

    findById(param: IRequestOptions): Observable<Page<Cidade>> {
        const url = `${this.path}/search-id`;
        return this.api.get<Page<Cidade>>(url, param)
    }

    findByNamePageable(param: IRequestOptions): Observable<Page<Cidade>> {
        const url = `${this.path}/search-name-pageable`;
        return this.api.get<Page<Cidade>>(url, param)
    }
    
    findByName(param: IRequestOptions): Observable<Array<Cidade>> {
        const url = `${this.path}/search-name`;
        return this.api.get<Array<Cidade>>(url, param);
    }
    
    findByIbge(param: IRequestOptions): Observable<Cidade>{
        const url = `${this.path}/search-ibge`;
        return this.api.get<Cidade>(url, param);
    }
}