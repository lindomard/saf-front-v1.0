import { Injectable } from '@angular/core';
import { Usecase } from '@base-core/usecase';
import { PageEntity } from '../../entities/page-entity.model';
import { State } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { ShowClassificacaoSearchAllSuccessState, ClassificacaoErrorState } from '../../state/classificacao-state';
import { safeCall } from '@base-core/safe-call';
import { ClassificacaoRepository } from '@register/domain/repositories/classificacao-repository';

@Injectable()
export class ClassificacaoSearchAllUseCase implements Usecase<PageEntity, State>{
    
    constructor(private repository: ClassificacaoRepository) {}

    execute(param: PageEntity): Observable<State> {
        return Observable.create(obs => {
            const subs = this.repository.getAll(this.fillParams(param)).subscribe(
                (reponse) => {
                    obs.next(new ShowClassificacaoSearchAllSuccessState(reponse));
                },
                error => {
                    obs.next(new ClassificacaoErrorState(error));
                },
                () => obs.complete()
            )
            setTimeout(() => {
                subs.unsubscribe();
            }, 10000);
        });
    }

    private fillParams(param?: PageEntity): IRequestOptions {
        return safeCall(param, () => {
             return {
                params: new HttpParams()
                .set('page', param.page.toString())
                .set('size', param.size.toString())
            }
        });
    }
}