import { Injectable } from '@angular/core';
import { Usecase } from '@base-core/usecase';
import { State, HideLoading } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { CidadeRepository } from '@register/domain/repositories/cidade-repository';
import { safeCall } from '@base-core/safe-call';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { CidadeSearchArrayState, CidadeErrorState } from '@register/domain/state/cidade-state';

@Injectable()
export class CidadeSearchNameUseCase implements Usecase<string, State> {

    constructor(private cidadeRespository: CidadeRepository) { }

    execute(param: string): Observable<State> {
        return Observable.create(obs => {
            const subject = this.cidadeRespository.findByName(this.fillParams(param))
                .subscribe(
                    (response) => {
                        obs.next(new CidadeSearchArrayState(response));
                    },
                    error => {
                        new CidadeErrorState(error.message);
                    },
                    () => {
                        obs.complete();
                    }
                )

            setTimeout(() => {
                subject.unsubscribe();
            }, 30000);
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