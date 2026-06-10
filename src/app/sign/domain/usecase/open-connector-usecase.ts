import { Usecase } from '@base-core/usecase';
import { State } from '@base-core/state/state';
import { Observable } from 'rxjs';
import { OpenconnectorRepository } from '../repositories/open-connector-repository';
import { OpenConnectorSuccessState, OpenConnectorErrorState } from '../state/state-connector';
import { Injectable } from '@angular/core';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class OpenConnectorUseCase implements Usecase<void, State> {
    
    constructor(private repository: OpenconnectorRepository) {}
    
    execute(param: void): Observable<State> {
        return Observable.create(obs => {
            
            const subject = this.repository.openConnector(this.getParams())
            .subscribe(
                resonse => obs.next(new OpenConnectorSuccessState(resonse)),
                error => obs.next(new OpenConnectorErrorState(error)),
                () => obs.complete()
            );
            
            setTimeout(() => {
                subject.unsubscribe();
            }, 10000);
        })
    }

    private getParams(): IRequestOptions {
        return {
            params: new HttpParams()
            .set('page', '1')
            .set('size', '1')
        }
    }
}