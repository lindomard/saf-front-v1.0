import { Injectable } from "@angular/core";
import { ContatoRepository } from '@register/domain/repositories/contato-repository';
import { ContatoClienteSave } from '../model/contato.model';
import { Observable } from 'rxjs';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';

@Injectable()
export class ContatoRepositoryService extends ContatoRepository {

    private readonly path = "contato";

    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }

    save(contatoCliente: ContatoClienteSave): Observable<void> {
        return this.api.post(this.path, contatoCliente);
    }

}