import { Injectable } from '@angular/core';
import { ApiCreateHttpclienteService } from '@base-core/build-request/api-create-httpcliente.service';
import { Observable } from 'rxjs';
import { DadosPessoasModel } from 'src/app/dados-pessoas-atraves-do-cnpj/data/model/dados-pessoas-atraves-do-cnpj-model';
import { DadosPessoasAtravesDoCnpjRepository } from 'src/app/dados-pessoas-atraves-do-cnpj/domain/repository/dados-pessoas-atraves-do-cnpj-repository';

@Injectable()
export class DadosPessoasAtravesDoCnpjRepositoryService extends DadosPessoasAtravesDoCnpjRepository{
    
    private readonly endPoint = 'dadosAtravesDoCnpj';
    
    constructor(private api: ApiCreateHttpclienteService) {
        super();
    }

    getCnpj(cnpj: string): Observable<DadosPessoasModel> {
      let url = this.endPoint + "?cnpj="+cnpj;
        return this.api.get<DadosPessoasModel>(url);
    }
}