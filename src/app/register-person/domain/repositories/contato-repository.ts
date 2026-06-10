import { Observable } from 'rxjs';
import { ContatoClienteSave } from '@register/data/model/contato.model';

export abstract class ContatoRepository {
    abstract save(contatoCliente: ContatoClienteSave): Observable<void>;
}