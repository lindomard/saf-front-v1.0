import { Usecase } from '@base-core/usecase';
import { State } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoriaRespository } from '@register/domain/repositories/categoria-repository';
import { safeCall } from '@base-core/safe-call';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { CategoriaSearchDataState } from '@register/domain/state/categoria-state';

@Injectable()
export class CategoriaSearchNivelUseCase implements Usecase<string, State> {
    
    constructor(private respository: CategoriaRespository) {}
    
    execute(param: string): Observable<State> {
        return Observable.create(obs => {
            const subject = this.respository.findByNivel(this.fillParam(param))
            .subscribe(
                (response) => obs.next(new CategoriaSearchDataState(response)),

                error => obs.next(error.message),

                () => obs.complete()
            );
            setTimeout(() => {
                subject.unsubscribe();
            }, 10000);
        });
    }

    private fillParam(nivel: string): IRequestOptions {
        return safeCall(nivel, () => {
            return {
                params: new HttpParams()
                .append('nivel', nivel)
            }
        });
    }
}