import { Category } from '@register/data/model/category.model';
import { State } from '@base-core/state/state';
import { Page } from '@base-core/model/page.model';

export class CategoriaSearchState implements State {
    constructor(public page: Page<Category>) {}
}

export class CategoriaSearchDataState implements State {
    constructor(public data: Category[]) {}
}

export class CategoriaErrorState implements State {
    constructor(public message: any) {}
}