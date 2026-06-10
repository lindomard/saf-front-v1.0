import { Usecase } from '@base-core/usecase';
import { Injectable } from '@angular/core';
import { State } from '@base-core/state/state';
import { ClassificacaoSearchById } from '../../entities/classificacao-search.model';
import { Observable } from 'rxjs';
import { PageEntity } from '../../entities/page-entity.model';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { HttpParams } from '@angular/common/http';
import { safeCall } from '@base-core/safe-call';
import { ClassificacaoErrorState, ShowClassificacaoSearchByIdSate } from '../../state/classificacao-state';
import { ClassificacaoRepository } from '@register/domain/repositories/classificacao-repository';

@Injectable()
export class ClassificacaoSearchIdUseCase implements Usecase<ClassificacaoSearchById, State> {
    
    constructor(private repository: ClassificacaoRepository) {}

    execute(param: ClassificacaoSearchById): Observable<State> {
      return Observable.create(obs => {
          const options = this.fillParams(param.pageable)
          const subs = this.repository.findById(param.query, options).subscribe(
              (reponse) => {
                obs.next(new ShowClassificacaoSearchByIdSate(reponse))
              },
              (error) => {
                obs.next(new ClassificacaoErrorState(error))
              },
              () => obs.complete()
          )
          setTimeout(() => {
              subs.unsubscribe();
          }, 10000);
      })
    }

    private fillParams(param?: PageEntity): IRequestOptions {
        return safeCall(param, () => {
             return {
                params: new HttpParams()
                .set('page', param.page.toString())
                .set('size', param.size.toString())
            }
        });
    }
}