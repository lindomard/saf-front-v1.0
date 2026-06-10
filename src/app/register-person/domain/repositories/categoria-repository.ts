import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { Category } from '@register/data/model/category.model';
import { Page } from '@base-core/model/page.model';

export abstract class CategoriaRespository {

    abstract getAll(param: IRequestOptions): Observable<Category[]>;

    abstract findById(param: IRequestOptions): Observable<Category>;
    
    abstract findByNome(param: IRequestOptions): Observable<Category[]>;

    abstract findByNivel(param: IRequestOptions): Observable<Category[]>;
}