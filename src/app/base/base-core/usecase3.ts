import { Observable } from 'rxjs';

export interface Usecase3<R1, R2, R3, T> {
    execute(param1: R1, param2: R2, param3: R3,): Observable<T>;
}


