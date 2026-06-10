import { Observable } from 'rxjs';
import { DadosCidadesAtravesDoCepModel } from 'src/app/dados-cidade-atraves-do-cep/data/model/dados-cidades-atraves-do-cep-model';

export abstract class DadosCidadesAtravesDoCepRepository {

    abstract getCep(cep: string): Observable<DadosCidadesAtravesDoCepModel>;
}