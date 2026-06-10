import { Observable } from 'rxjs';

export interface Usecase<R, T> {
    execute(param: R): Observable<T>;
}
