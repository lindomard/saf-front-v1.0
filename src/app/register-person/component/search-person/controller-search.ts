import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {State} from '@base-core/state/state';
import {ClientFindUseCase, ClientSearchEntity} from '@register/domain/usecase/search/cliente-find-usecase';

@Injectable()
export class ControllerSearch {

  constructor(
    private clientFindUseCase: ClientFindUseCase
  ) {
  }

  get observableSearch(): Observable<State> {
    return this.$observable;
  }

  private $subjectSubject = new BehaviorSubject<State>({});
  private $observable = this.$subjectSubject.asObservable();


  fetchClients(client?: ClientSearchEntity) {
    this.clientFindUseCase.execute(client)
      .subscribe(state => this.$subjectSubject.next(state));
  }

}
