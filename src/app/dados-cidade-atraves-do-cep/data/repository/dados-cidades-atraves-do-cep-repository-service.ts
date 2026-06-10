import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { DadosCidadesAtravesDoCepModel } from 'src/app/dados-cidade-atraves-do-cep/data/model/dados-cidades-atraves-do-cep-model';
import { DadosCidadesAtravesDoCepRepository } from 'src/app/dados-cidade-atraves-do-cep/domain/repository/dados-cidades-atraves-do-cep-repository';

@Injectable()
export class DadosCidadesAtravesDoCepRepositoryService extends  DadosCidadesAtravesDoCepRepository {
    
    private readonly endPoint = 'viacep';
    
    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }

    getCep(cep: string): Observable<DadosCidadesAtravesDoCepModel> {
      let url = this.endPoint+"?cep="+cep;
        return this.api.get<DadosCidadesAtravesDoCepModel>(url);
    }
}