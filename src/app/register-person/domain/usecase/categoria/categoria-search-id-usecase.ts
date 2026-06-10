import { Usecase } from '@base-core/usecase';
import { State } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { CategoriaRespository } from '@register/domain/repositories/categoria-repository';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { safeCall } from '@base-core/safe-call';
import { CategoriaErrorState, CategoriaSearchDataState } from '@register/domain/state/categoria-state';
import { Category } from '@register/data/model/category.model';
import { Injectable } from '@angular/core';
import { isNumeric } from '@base-core/function/validation-number';

@Injectable()
export class CategoriaSearchIdUseCase implements Usecase<string, State> {
    
    constructor(private repository: CategoriaRespository) {}

    execute(param: string): Observable<State> {
        if (!isNumeric(param)) {
            return Observable.create(obs => {
                obs.next(new CategoriaErrorState('Informe um número válido!'));
                obs.complete();
            });
        }

        return Observable.create(obs => {
            const subject = this.repository.findById(this.fillParam(param))
            .subscribe(
                (response) => obs.next(new CategoriaSearchDataState(this.toArray(response))),

                error => new CategoriaErrorState(error.message),
                
                () => obs.complete()
            );
            setTimeout(() => {
                subject.unsubscribe();
            }, 10000);
        });
    }

    private fillParam(id: string): IRequestOptions {
        return safeCall(id, () => {
            return {
                params: new HttpParams()
                .append('id', id)
            }
        });
    }

    private toArray(obj: Category): Category[] {
        return [obj];
    }
}