import { Observable } from 'rxjs';

export abstract class ImageRepository {

    abstract save(object: FormData): Observable<any>;
} 