import { State } from '@base-core/state/state';

export class ShowLoadingImageState implements State {

    constructor(public param: any) {}
}

export class ShowImageSuccessState implements State {

    constructor(public param: any) {}
}

export class ShowImageErrorState implements State {

    constructor(public param: any) {}
}
