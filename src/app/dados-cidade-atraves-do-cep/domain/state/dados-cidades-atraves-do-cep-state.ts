import { State } from '@base-core/state/state';
import { DadosCidadesAtravesDoCepModel } from 'src/app/dados-cidade-atraves-do-cep/data/model/dados-cidades-atraves-do-cep-model';

export class DadosCidadesAtravesDoCepSucess implements State {
    constructor(public dadosCidadesAtravesDoCepModel: DadosCidadesAtravesDoCepModel) {}
}

export class DadosCidadesAtravesDoCepError implements State {
    constructor(public param: any) {}
}



export class DadosCidadesConjugeLocTraAtravesDoCepSucess implements State {
  constructor(public dadosCidadesAtravesDoCepModel: DadosCidadesAtravesDoCepModel) {}
}

export class DadosCidadesConjugeLocTraAtravesDoCepError implements State {
  constructor(public param: any) {}
}
