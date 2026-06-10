import { IRequestOptions } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { ViaCep } from '@register/data/model/viacep.model';

export abstract class ViaCepRepository {

    abstract getCep(param: IRequestOptions): Observable<ViaCep>;
}