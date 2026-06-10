import { ImageRepository } from '@register/domain/repositories/image-repository';
import { Injectable } from '@angular/core';
import { IRequestOptions, ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';

@Injectable()
export class ImageRepositoryService extends ImageRepository {

    private readonly path = 'imagem/files';

    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }

    save(object: FormData): Observable<any> {

        return this.api.postFile<any>(this.path, object);
    }
}