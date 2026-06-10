import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '@base-core/state/state';
import { SignUsecase } from '@sign/domain/usecase/sign-usecase';
import { UntypedFormGroup } from '@angular/forms';

@Injectable()
export class SignControllerSL {

    private $signSubject = new BehaviorSubject<State>({});
    private _observable = this.$signSubject.asObservable();

    constructor(private signUseCase: SignUsecase) { }

    get observable(): Observable<State> {
        return this._observable;
    }

    signIn(form: UntypedFormGroup) {
        this.signUseCase.execute(form)
        .subscribe(state => this.$signSubject.next(state));
    }
}