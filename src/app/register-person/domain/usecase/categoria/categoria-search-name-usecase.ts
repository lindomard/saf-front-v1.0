import { Usecase } from '@base-core/usecase';
import { State } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { CategoriaRespository } from '@register/domain/repositories/categoria-repository';
import { safeCall } from '@base-core/safe-call';
import { HttpParams } from '@angular/common/http';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { CategoriaSearchDataState, CategoriaErrorState } from '@register/domain/state/categoria-state';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaSearhNameUseCase implements Usecase<string, State> {

    constructor(private respository: CategoriaRespository) {}

    execute(name: string): Observable<State> {
        return Observable.create(obs => {
            const subject = this.respository.findByNome(this.fillParam(name)).subscribe(
                (response) => obs.next(new CategoriaSearchDataState(response)),

                error => obs.next(new CategoriaErrorState(error.message)),

                () => obs.complete()
            );
            setTimeout(() => {
                subject.unsubscribe();
            }, 10000);
        });
    }

    private fillParam(nome: string): IRequestOptions {
        return safeCall(nome, () => {
            return {
                params: new HttpParams()
                .append('nome', `${nome}`)
            }
        });
    }
}