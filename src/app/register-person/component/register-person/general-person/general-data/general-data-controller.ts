import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { State } from '@base-core/state/state';

@Injectable()
export class GeneralDataController {

    private _$generalDataSubject = new BehaviorSubject<State>({});
    private _$observable = this._$generalDataSubject.asObservable();

    constructor() {}
}