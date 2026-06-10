import { Classificacao } from '@register/data/model/classificao.model';
import { Page } from '@base-core/model/page.model';
import { Observable } from 'rxjs';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';

export abstract class ClassificacaoRepository {

    abstract findById(query: string, options: IRequestOptions): Observable<Page<Classificacao>>;

    abstract findByName(query: string, options: IRequestOptions): Observable<Page<Classificacao>>;

    abstract getAll(options: IRequestOptions): Observable<Page<Classificacao>>
}