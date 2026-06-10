import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { safeCall } from '@base-core/safe-call';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { Usecase } from '@base-core/usecase';
import { PageEntity } from '@register/domain/entities/page-entity.model';
import { CidadeRepository } from '@register/domain/repositories/cidade-repository';
import { CidadeErrorState, CidadeSearchState } from '@register/domain/state/cidade-state';
import { Observable } from 'rxjs';

@Injectable()
export class CidadeSearchAllUseCase implements Usecase<PageEntity, State>{

    constructor(private cidadeRepository: CidadeRepository) {}

    execute(param: PageEntity): Observable<State> {
        const httpParams = this.fillParam(param);
        return new  Observable(obs => {
            obs.next(new ShowLoading());
            const subject = this.cidadeRepository.getAll(httpParams)
            .subscribe(
                (response) => {
                    obs.next(new CidadeSearchState(response));
                },
                (error) => {
                    obs.next(new CidadeErrorState(error.message));
                },
                () => {
                    obs.next(new HideLoading());
                    obs.complete();
                }
            )

            setTimeout(() => {
                obs.next(new HideLoading());
                subject.unsubscribe();
            }, 10000);
        })
    }

    private fillParam(param: PageEntity): IRequestOptions {
        return safeCall(param, () => {
            return {
                params: new HttpParams()
                .append('page', param.page.toString())
                .append('size', param.size.toString())
            }
        })
    }
}