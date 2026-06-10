import { Injectable } from '@angular/core';
import { Usecase } from '@base-core/usecase';
import { State, HideLoading } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { PersonRepository } from '@register/domain/repositories/person-repository';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { ShowClienteState, ShowErrorClienteState } from '@register/domain/state/register-person-state';
import { initEmptyClienteAll } from '@register/domain/utils/cliente-utils';
import { getTypeFilter, SituationClient } from '@register/domain/entities/search.entity';

@Injectable()
export class ClientFindUseCase implements Usecase<ClientSearchEntity, State>{

    constructor(private registerRepository: PersonRepository) { }

    execute(param: ClientSearchEntity): Observable<State> {
        return new Observable(obs => {
            const subject = this.registerRepository.find(this.getParams(param))
                .subscribe(
                    (response) => {
                        if (response == null) {
                            obs.next(new ShowClienteState(initEmptyClienteAll()));
                        } else {
                            obs.next(new ShowClienteState(response))
                        }
                    },
                    (error) => obs.next(new ShowErrorClienteState(error)),
                    () => {
                        obs.next(new HideLoading());
                        obs.complete()
                    },
                )
            setTimeout(() => {
                obs.next(new HideLoading());
                subject.unsubscribe();
            }, 10000);
        });
    }

    private getParams(param: ClientSearchEntity): IRequestOptions {
        return {
            params: new HttpParams()
                .set('situation', `${param.situation == null ? SituationClient.All : param.situation }`)
                .set('valueFilterOne', param.valueFilterOne)
                .set('valueFilterTwo', param.valueFilterTwo)
                .set('filterOne', getTypeFilter(param.filterOne))
                .set('filterTwo', getTypeFilter(param.filterTwo))
        }
    }

}

export interface ClientSearchEntity {
    page?: number;
    size?: number;
    filterOne?: string;
    filterTwo?: string;
    valueFilterOne?: string;
    valueFilterTwo?: string;
    situation: string;
}
