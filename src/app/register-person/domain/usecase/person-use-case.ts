import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { Usecase } from '@base-core/usecase';
import { Observable } from 'rxjs';
import { PersonRepository } from '../repositories/person-repository';
import { ShowPersonEdit } from '../state/register-person-state';

@Injectable()
export class PersonUseCase implements Usecase<string, State> {

    constructor(private personRespository: PersonRepository) { }

    execute(param: string): Observable<State> {
        return new Observable(obs => {
            obs.next(new ShowLoading());
            const subscriber = this.personRespository.findById(this.getParams(param))
                .subscribe(
                    (res) => {
                        obs.next(new ShowPersonEdit(res));
                    },
                    err => {
                        obs.next(new ShowPersonEdit(err));
                    },
                    () => {
                        obs.next(new HideLoading());
                        obs.complete();
                    });
                    return () => {
                        setTimeout(() => {
                            obs.next(new HideLoading());
                            subscriber.unsubscribe();
                        }, 15000);
                    };
        });
    }

    private getParams(param: string): IRequestOptions {
        return {
            params: new HttpParams()
                .set('id', param)
        };
    }
}