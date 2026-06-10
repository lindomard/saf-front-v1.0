import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { Page } from '@base-core/model/page.model';
import { Cidade } from '../../data/model/cidade.model';
import { Observable } from 'rxjs';

export abstract class CidadeRepository {

    abstract getAll(param: IRequestOptions): Observable<Page<Cidade>>;

    abstract findByNamePageable(param: IRequestOptions): Observable<Page<Cidade>>;
    
    abstract findByName(param: IRequestOptions): Observable<Array<Cidade>>;

    abstract findById(param: IRequestOptions): Observable<Page<Cidade>>;

    abstract findByIbge(param: IRequestOptions): Observable<Cidade>;

}