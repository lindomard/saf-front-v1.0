import { Injectable } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { State } from '@base-core/state/state';
import { PageEntity } from '@register/domain/entities/page-entity.model';
import { CategoriaSearchAllUseCase } from '@register/domain/usecase/categoria/categoria-search-all-usecase';
import { CidadeSearchAllUseCase } from '@register/domain/usecase/cidade/cidade-search-all-usecase';
import { CidadeSearchIbgeUseCase } from '@register/domain/usecase/cidade/cidade-search-ibge-usecase';
import { CidadeSearchNameUseCase } from '@register/domain/usecase/cidade/cidade-search-name-usecase';
import { PersonValidCnpjUseCase } from '@register/domain/usecase/search/person-valid-cnpj-usecase';
import { ViaCepUseCase } from '@register/domain/usecase/viacep/viacep-usecase';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class PersonController {
    private _$personSubject = new BehaviorSubject<State>({});
    private _$observable = this._$personSubject.asObservable();

    constructor(
        private cidadeSearchAllUseCase: CidadeSearchAllUseCase,
        private CategoriaSearchAllUseCase: CategoriaSearchAllUseCase,
        private cidadeSearchNameUseCase: CidadeSearchNameUseCase,
        private viacepUseCase: ViaCepUseCase,
        private cidadeSearchIbgeUseCase: CidadeSearchIbgeUseCase,
        private personValidCnpjUseCase: PersonValidCnpjUseCase,
    ) { }

    fetchClassificacao(page?: PageEntity) {
        this.cidadeSearchAllUseCase.execute(page)
            .subscribe(state => this._$personSubject.next(state));
    }

    fetchCidade() {
        const param = { page: 0, size: 10 };
        this.cidadeSearchAllUseCase.execute(param)
            .subscribe(state => this._$personSubject.next(state));
    }

    fetchCatergoria() {
        this.CategoriaSearchAllUseCase.execute()
            .subscribe(state => this._$personSubject.next(state));
    }

    searchCidadeByName(params) {
        this.cidadeSearchNameUseCase.execute(params)
            .subscribe(state => this._$personSubject.next(state));
    }

    getCep(cep: string) {
        this.viacepUseCase.execute(cep)
            .subscribe(state => this._$personSubject.next(state));
    }

    getIbge(ibge: string) {
        this.cidadeSearchIbgeUseCase.execute(ibge)
            .subscribe(state => this._$personSubject.next(state));
    }

    verifyCnpj(control: UntypedFormControl) {
        this.personValidCnpjUseCase.execute(control)
            .subscribe(state => this._$personSubject.next(state));
    }

    get observable(): Observable<State> {
        return this._$observable;
    }
}