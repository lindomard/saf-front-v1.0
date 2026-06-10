import * as moment from 'moment';
import { FuncoesGerais } from './funcoes';
import { ItemSelectIdStr } from '@base-shared/select/select.component';




export function getCondicoesNumeroDataArray(): any {
    return [{ id: '=', name: 'igual a ' }
        , { id: '<=', name: 'menor ou igual a' }
        , { id: '>', name: 'maior que ' }
        , { id: '<', name: 'menor que ' }
        , { id: '>=', name: 'maior ou igual a' }
        , { id: '<>', name: 'diferente de ' }

    ]

        ;



}

export function getCondicoesTodasArray(): any {
    return [{ id: '=', name: 'igual a ' }
        , { id: '<=', name: 'menor ou igual a' }
        , { id: '>', name: 'maior que ' }
        , { id: '<', name: 'menor que ' }
        , { id: '>=', name: 'maior ou igual a' }
        , { id: '<>', name: 'diferente de ' }
        , { id: FuncoesGerais.inicioIgual, name: 'inicio igual ' }
        , { id: FuncoesGerais.inicioDiferente, name: 'inicio diferente ' }
        , { id: FuncoesGerais.contenha, name: 'contenha ' }
        , { id: FuncoesGerais.naoContenha, name: 'nao contenha ' }

    ]

        ;



}


export function getCondicoesStringArray(): any {


    return [{ id: FuncoesGerais.Igual, name: 'igual a ' }
        , { id: FuncoesGerais.diferente, name: 'diferente de ' }
        , { id: FuncoesGerais.inicioIgual, name: 'inicio igual ' }
        , { id: FuncoesGerais.inicioDiferente, name: 'inicio diferente ' }
        , { id: FuncoesGerais.contenha, name: 'contenha ' }
        , { id: FuncoesGerais.naoContenha, name: 'nao contenha ' }

    ];


}

export function getRelacionarCondicao(): ItemSelectIdStr[] {


    return [{ id: ' and ', name: ' e ' }
        , { id: ' or ', name: ' ou ' }
    ];


}


export function fCaminhoRetornoAuxiliares(): String {

    return "page/cadastros-auxiliares";
}

export function attribuiSeVazio(itOri: any, itDes: any): any {
    if ((itOri) && (!itDes)) itDes = itOri;
    return itDes;

}



export function ultimoDiaDoAno(pData: Date): String {


    return moment(pData).format('YYYY') + "-12-31";


}

export function getUltimoDiaDoMes(data: Date): Date {
    return new Date(data.getFullYear(), data.getMonth() + 1, 0);
  }



export function fPegarFiltroId(pArray: any, pNome: String) {
    let index = pArray.findIndex(o => o.name === pNome);
    if (index < 0) {
      index = 0;
    }

    return pArray[index].id;

  }

  export function fPegarFiltroName(pArray: any, pId: String) {
    let index = pArray.findIndex(o => o.id === pId);
    if (index < 0) {
      index = 0;
    }
    return pArray[index].name;

  }


  export function fConverterPerc595(pValorPixel: number): number {

    let mRetorno: number = 0;
    try {

        mRetorno =  Math.trunc( (100/595)*pValorPixel);
        
    } catch (error) {
        console.log('erro 125: ', error)
    }


    return mRetorno;

  }


  export function fConverterPerc842(pValorPixel: number): number {

    let mRetorno: number = 0;
    try {

        mRetorno =  Math.trunc( (100/842)*pValorPixel);
        
    } catch (error) {
        console.log('erro 142: ', error)
    }


    return mRetorno;

  }
