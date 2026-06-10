import { State } from 'src/app/base/base-core/state/state';

export class SuccessState implements State {

    constructor(public param: any){} 
}

export class ErroState implements State {
    constructor(public param: string){}
}