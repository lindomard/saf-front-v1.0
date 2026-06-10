 
import { State } from '@base-core/state/state';
import { DadosPessoasModel } from 'src/app/dados-pessoas-atraves-do-cnpj/data/model/dados-pessoas-atraves-do-cnpj-model';
 
 
export class DadosPessoasAtravesDoCnpjSucess implements State { 
    constructor(public param: DadosPessoasModel){}
}
 
export class DadosPessoasAtravesDoCnpjError implements State { 
    constructor(public param: any){}
}
 

