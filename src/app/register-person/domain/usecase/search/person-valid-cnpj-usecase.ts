import { Usecase } from '@base-core/usecase';
import { State, HideLoading } from '@base-core/state/state';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonRepository } from '@register/domain/repositories/person-repository';
import { HttpParams } from '@angular/common/http';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { ShowErrorClienteState, ShowExistCnpjOrCpf } from '@register/domain/state/register-person-state';
import { UntypedFormControl } from '@angular/forms';

@Injectable()
export class PersonValidCnpjUseCase implements Usecase<UntypedFormControl, State> {

    constructor(private registerRepository: PersonRepository) { }

    execute(param: UntypedFormControl): Observable<State> {

        if (param.invalid) {
            return new Observable(obs => {
                obs.complete();
            });
        }

        return new Observable(obs => {
            const subject = this.registerRepository.findByCnpj(this.getParams(param))
                .subscribe(
                    (response) => {
                        if (response != null) {
                            obs.next(new ShowExistCnpjOrCpf())
                        }
                    },
                    (error) => obs.next(new ShowErrorClienteState(error)),
                    () => {
                        obs.complete();
                    }
                )

            setTimeout(() => {
                obs.next(new HideLoading());
                subject.unsubscribe();
            }, 10000);
        });
    }

    private getParams(param: UntypedFormControl): IRequestOptions {
        return {
            params: new HttpParams()
                .set('cnpj', param.value)
                .set('situacao', `0`)
        }
    }
}
