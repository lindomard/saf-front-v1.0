import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { safeCallOrNull } from '@base-core/safe-call';
import { HideLoading, ShowLoading, State } from '@base-core/state/state';
import { Usecase } from '@base-core/usecase';
import { ViaCepRepository } from '@register/domain/repositories/viacep-repository';
import { CleanAddress, ShowErrorViaCep, ShowViaCep } from '@register/domain/state/viacep-state';
import { Observable } from 'rxjs';

@Injectable()
export class ViaCepUseCase implements Usecase<string, State>{

    constructor(private viaCepRepository: ViaCepRepository) { }

    execute(param: string): Observable<State> {
        let cepArray;
        param = param == "" ? null : param
        safeCallOrNull(param, (it) => {
            cepArray = it.replace(/_/g, '').replace('-', '');
        }, () => {
            return new Observable(obs => {
                obs.next(new CleanAddress());
                obs.complete()
            });
        });

        if (cepArray.length < 8) {
            return new Observable(obs => {
                obs.next(new CleanAddress());
                obs.complete()
            });
        }

        return new Observable(obs => {
            obs.next(new ShowLoading())
            const subject = this.viaCepRepository.getCep(this.getParams(param))
                .subscribe(
                    (response) => {
                        safeCallOrNull(response, (it) => {
                            obs.next(new ShowViaCep(it));
                        }, () => {
                            obs.next(new ShowErrorViaCep(""));
                        })
                       
                    },
                    (error) => {
                        obs.next(new ShowErrorViaCep(error));
                    },
                    () => {
                        obs.next(new HideLoading());
                        obs.complete();
                    }
                );

            setTimeout(() => {
                obs.next(new HideLoading());
                subject.unsubscribe();
            }, 10000);
        });
    }

    private getParams(cep: string): IRequestOptions {
        return {
            params: new HttpParams()
                .append('cep', cep)
        }
    }
}