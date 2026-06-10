import { Usecase } from '@base-core/usecase';
import { State, ShowLoading, HideLoading } from '@base-core/state/state';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CidadeRepository } from '@register/domain/repositories/cidade-repository';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { ShowErrorClienteState } from '@register/domain/state/register-person-state';
import { ShowIbgeState } from '@register/domain/state/cidade-state';

@Injectable()
export class CidadeSearchIbgeUseCase implements Usecase<string, State>{
    
    constructor(private cidadeRepository: CidadeRepository) {}

    execute(param: string): Observable<State> {
        return Observable.create(obs => {
            const subject = this.cidadeRepository.findByIbge(this.getParam(param))
            .subscribe(
                (response) => {
                    obs.next(new ShowIbgeState(response));
                },
                (error) => {
                    obs.next(new ShowErrorClienteState(error));
                },
                () => {
                    obs.complete();
                }
            );
            setTimeout(() => {
                subject.unsubscribe();
            }, 30000);
        });
    }

    private getParam(param: string): IRequestOptions {
        return {
            params: new HttpParams()
            .append('ibge', param)
        }
    }
}