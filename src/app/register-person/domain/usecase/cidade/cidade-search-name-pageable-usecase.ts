import { Usecase } from '@base-core/usecase';
import { Injectable } from '@angular/core';
import { State } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { CidadeRepository } from '@register/domain/repositories/cidade-repository';
import { CidadeSearchState, CidadeErrorState } from '@register/domain/state/cidade-state';
import { safeCall } from '@base-core/safe-call';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CidadeSearchNamePageableUseCase implements Usecase<string, State> {

    constructor(private repository: CidadeRepository) {}

    execute(param: string): Observable<State> {
        const httpParams = this.fillParams(param);
        return Observable.create(obs => {
            const subject = this.repository.findByNamePageable(httpParams)
            .subscribe(
                (response) => {
                    obs.next(new CidadeSearchState(response));
                },
                error => {
                    new CidadeErrorState(error.message);
                },
                () => obs.complete()
            )

            setTimeout(() => {
                subject.unsubscribe();
            }, 10000);
        })
    }

    private fillParams(param: string): IRequestOptions {
        return safeCall(param, () => {
           return { 
                params: new HttpParams()
                .append('nome', param)
            }
        });
    }
}

export interface CidadeSearchName {
    page?: number;
    size?: number;
    name?: string;
}