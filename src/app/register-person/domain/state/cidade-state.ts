import { Page } from '@base-core/model/page.model';
import { Cidade } from '@register/data/model/cidade.model';
import { State } from '@base-core/state/state';

export class CidadeSearchState implements State {
    constructor(public page: Page<Cidade>) { }
}

export class CidadeSearchArrayState implements State {
    constructor(public cidades: Array<Cidade>) { }
}

export class CidadeErrorState implements State {
    constructor(public message: any) { }
}

export class ShowIbgeState implements State {
    constructor(public cidade: Cidade) { }
} 