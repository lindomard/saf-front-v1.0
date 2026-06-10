import { State } from '@base-core/state/state';
import { ViaCep } from '@register/data/model/viacep.model';

export class ShowViaCep implements State {
    constructor(public viacep: ViaCep) {}
}

export class ShowErrorViaCep implements State {
    constructor(public error: any) {}
}
export class CleanAddress implements State {
    constructor() {}
}