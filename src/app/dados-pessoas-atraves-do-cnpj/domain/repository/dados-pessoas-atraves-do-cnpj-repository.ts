import { Observable } from 'rxjs';
import { DadosPessoasModel } from 'src/app/dados-pessoas-atraves-do-cnpj/data/model/dados-pessoas-atraves-do-cnpj-model';

export abstract class DadosPessoasAtravesDoCnpjRepository {

    abstract getCnpj(cnpj: string): Observable<DadosPessoasModel>;
}