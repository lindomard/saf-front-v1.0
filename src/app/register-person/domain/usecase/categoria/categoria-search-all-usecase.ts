import { Usecase } from '@base-core/usecase';
import { PageEntity } from '@register/domain/entities/page-entity.model';
import { State, ShowLoading, HideLoading } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { CategoriaRespository } from '@register/domain/repositories/categoria-repository';
import { safeCall } from '@base-core/safe-call';
import { HttpParams } from '@angular/common/http';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { CategoriaErrorState, CategoriaSearchDataState } from '@register/domain/state/categoria-state';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaSearchAllUseCase implements Usecase<PageEntity, State> {

    constructor(private repository: CategoriaRespository) {}
    
    execute(param?: PageEntity): Observable<State> {
        return Observable.create(obs => {
            obs.next(new ShowLoading());
            const httpParams = this.fillParam(param);
            const subject  = this.repository.getAll(httpParams)
            .subscribe(
                (response) => {
                    obs.next(new CategoriaSearchDataState(response))
                },
                error => {
                    obs.nex(new CategoriaErrorState(error.message))
                },
                () => {
                    obs.next(new HideLoading());
                    obs.complete()
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
                .append('page', `${param.page}`)
                .append('size', `${param.size}`)
            }
        })
    }
}