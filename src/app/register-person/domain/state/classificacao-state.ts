import { State } from '@base-core/state/state';
import { Page } from '@base-core/model/page.model';
import { Classificacao } from '@register/data/model/classificao.model';

export class ShowClassificacaoSearchAllSuccessState implements State {

    constructor(public param: Page<Classificacao>) {}
}

export class ClassificacaoErrorState implements State {
    constructor(public error: any) {}
}

export class ShowClassificacaoSearchByNameSate implements State {
    constructor(public page: Page<Classificacao>) {}
}

export class ShowClassificacaoSearchByIdSate implements State {
    constructor(public page: Page<Classificacao>) {}
}