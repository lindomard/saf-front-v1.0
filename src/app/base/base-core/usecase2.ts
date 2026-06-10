import { Observable } from 'rxjs';

export interface Usecase2<R1, R2, T> {
    execute(param: R1, param2: R2,): Observable<T>;
}


