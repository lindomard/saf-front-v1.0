import { CategoriaRespository } from '@register/domain/repositories/categoria-repository';
import { IRequestOptions, ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaRepositoryService extends CategoriaRespository {

    private readonly path = 'categoria';

    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }

    getAll(): Observable<Category[]> {
        return this.api.get<Category[]>(this.path);
    }

    findById(param: IRequestOptions): Observable<Category> {
        const url = `${this.path}/search-id`;
        return this.api.get<Category>(url, param);
    }

    findByNome(param: IRequestOptions): Observable<Category[]> {
        const url = `${this.path}/search-nome`;
        return this.api.get<Category[]>(url, param);
    }

    findByNivel(param: IRequestOptions): Observable<Category[]> {
        const url = `${this.path}/search-nivel`;
        return this.api.get<Category[]>(url, param);
    }
}