import { Usecase } from '@base-core/usecase';
import { Injectable } from '@angular/core';
import { State } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { CidadeRepository } from '@register/domain/repositories/cidade-repository';
import { safeCall } from '@base-core/safe-call';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { CidadeSearchState, CidadeErrorState } from '@register/domain/state/cidade-state';
import { isNumeric } from '@base-core/function/validation-number';

@Injectable()
export class CidadeSearchIdUseCase implements Usecase<number, State> {

    constructor(private respository: CidadeRepository) { }

    execute(param: number): Observable<State> {
        if (!isNumeric(param)) {
            return Observable.create(obs => {
                obs.next(new CidadeErrorState('Informe um número válido!'));
                obs.complete();
            });
        }

        return Observable.create(obs => {
            const httpParams = this.fillParams(param);
            const subject = this.respository.findById(httpParams)
                .subscribe(
                    (response) => {
                        obs.next(new CidadeSearchState(response));
                    },
                    error => {
                        obs.next(new CidadeErrorState(error.message));
                    },
                    () => obs.complete()
                );

            setTimeout(() => {
                subject.unsubscribe();
            }, 10000);
        });
    }

    private fillParams(param: number): IRequestOptions {
        return safeCall(param, () => {
            return {
                params: new HttpParams()
                    .append('id', param.toString())
            }
        });
    }

}

export interface CidadeSearchId {
    page?: number;
    size?: number;
    id?: number;
}