import { ApiCreateHttpclienteService, IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { Page } from '@base-core/model/page.model';
import { Classificacao } from '../model/classificao.model';
import { Injectable } from '@angular/core';
import { ClassificacaoRepository } from '@register/domain/repositories/classificacao-repository';

@Injectable()
export class ClassificacaoService extends ClassificacaoRepository {
    private readonly endPoint = "classificacao";


    constructor(private api: ApiCreateHttpclienteService) {
        super()
    }

    findByName(query: string, options: IRequestOptions): Observable<Page<Classificacao>> {
        const url = `${this.endPoint}/search-name`
        return this.api.get<Page<Classificacao>>(url, options);
    }

    getAll(options: IRequestOptions): Observable<Page<Classificacao>> {
        return this.api.get<Page<Classificacao>>(this.endPoint, options);
    }

    findById(query: string, options: IRequestOptions): Observable<Page<Classificacao>> {
        const url = `${this.endPoint}/search-id`
        return this.api.get<Page<Classificacao>>(`${this.endPoint}${query}`, options);
    }
}