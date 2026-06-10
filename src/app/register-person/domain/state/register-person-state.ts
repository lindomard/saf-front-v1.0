import { State } from 'src/app/base/base-core/state/state';
import { ClienteAll } from '../entities/cliente-entity.model';
import { Page } from '@base-core/model/page.model';
import { PersonResponse } from '@register/data/model/person-response.model';

export class SuccessSaveResgiter implements State {
    constructor(public param: any) { }
}

export class ErrorRegisterPerson implements State {
    constructor(public param: any) { }
}

export class ErrorFormRegisterPerson implements State {
    constructor(public param: any) { }
}

export class ShowClienteIdState implements State {
    constructor(public cliente: ClienteAll) { }
}
export class ShowClienteEmptyState implements State {
    constructor(public cliente: Page<ClienteAll>) { }
}

export class ShowClienteIdEmptyState implements State {
    constructor(public cliente: ClienteAll[]) { }
}

export class ShowErrorClienteIdState implements State {
    constructor(public param: any) { }
}

export class ShowErrorClienteIdNumericState implements State {
    constructor(public param: any) { }
}

export class ShowClienteState implements State {
    constructor(public page: Page<ClienteAll>) { }
}

export class ShowAllClienteState implements State {
    constructor(public page: Page<ClienteAll>) { }
}

export class ShowErrorClienteState implements State {
    constructor(public param: any) { }
}

export class ShowExistCnpjOrCpf implements State {
    constructor() {}
}

export class ShowPersonEdit implements State {
    constructor(public data: PersonResponse) {}
}

export class ShowErrorPerson implements State {
    constructor(public message: string) {}
}