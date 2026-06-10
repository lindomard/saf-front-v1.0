import { Usecase } from '@base-core/usecase';
import { State, HideLoading } from '@base-core/state/state';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonRepository } from '@register/domain/repositories/person-repository';
import { HttpParams } from '@angular/common/http';
import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { ClientData } from '@register/domain/entities/cliente-entity.model';
import { ShowClienteState, ShowErrorClienteState } from '@register/domain/state/register-person-state';
import { initEmptyClienteAll } from '@register/domain/utils/cliente-utils';

@Injectable()
export class ClienteEstadoUseCase {}
//  implements Usecase<ClientData, State> {

//     constructor(private registerRepository: PersonRepository) { }

//     execute(param: ClientData): Observable<State> {
//         return Observable.create(obs => {
//             const subject = this.registerRepository.findByEstado(this.getParams(param))
//                 .subscribe(
//                     (response) => {
//                         if (response == null) {
//                             obs.next(new ShowClienteState(initEmptyClienteAll()));
//                         } else {
//                             obs.next(new ShowClienteState(response))
//                         }
//                     },
//                     (error) => obs.next(new ShowErrorClienteState(error)),
//                     () => {
//                         obs.next(new HideLoading());
//                         obs.complete()
//                     }
//                 )

//             setTimeout(() => {
//                 obs.next(new HideLoading());
//                 subject.unsubscribe();
//             }, 10000);
//         });
//     }

//     private getParams(param: ClientData): IRequestOptions {
//         return {
//             params: new HttpParams()
//                 .set('estado', param.text)
//                 .set('situacao', `${param.situation}`)
//         }
//     }
// }
