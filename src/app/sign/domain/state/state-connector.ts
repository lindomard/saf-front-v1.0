import { State } from '@base-core/state/state';

export class OpenConnectorSuccessState implements State {
    constructor(public response: any) {}
}

export class OpenConnectorErrorState implements State {
    constructor(public response: any) {}
}