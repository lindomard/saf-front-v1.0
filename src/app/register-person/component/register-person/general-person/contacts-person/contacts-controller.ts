import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '@base-core/state/state';
import { CategoriaSearchAllUseCase } from '@register/domain/usecase/categoria/categoria-search-all-usecase';

@Injectable()
export class ContactsController {
    private $contactsSubject = new BehaviorSubject<State>({});
    private _$observable = this.$contactsSubject.asObservable();

    constructor(private CategoriaSearchAllUseCase: CategoriaSearchAllUseCase) { }

    fetchCatergoria() {
        this.CategoriaSearchAllUseCase.execute()
            .subscribe(state => this.$contactsSubject.next(state));
    }

    get observable(): Observable<State> {
        return this._$observable;
    }
}