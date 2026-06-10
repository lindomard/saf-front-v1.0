import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ParseFloat } from './function-form';
import { AsyncSubject, Observable } from 'rxjs';
import { padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';


@Injectable()
export class FuncoesGerais {


  public static inicioIgual = "<<";
  public static inicioDiferente = "!<";
  public static finalIgual = ">>";
  public static finalDiferente = ">!";

  public static contenha = "^^";
  public static naoContenha = "!^";
  public static Igual = "=";
  public static diferente = "<>";
  public static maiorIgual = ">=";
  public static menorIgual = "<=";

  static fPegarDataAtual() {
    return new Date();
  }
  static fAbrirLinkNFe(pChvNfe: String) {

    window.open(
      'http://www.nfe.fazenda.gov.br/portal/consultaRecaptcha.aspx?tipoConsulta=completa&tipoConteudo=XbSeqxE8pl8=&nfe='
      + pChvNfe
      , '_system', 'location=yes');
  }


  static fAbrirLinkNFce(pLink: String) {


    pLink = pLink.split("_").join("|");
    //        str.split(search).join(replacement)
    window.open(pLink.toString(), '_system', 'location=yes');
  }


  static Arredondar(pValor: number, pQtdDec: number) {
    if (pValor <= 0) {
      return 0
    } else {
      try {
        return pValor.toFixed(pQtdDec);
      } catch (error) {
        return 0;

      }

    }
  }





  static Truncar(pValor: number) {
    if (pValor <= 0) {
      return 0
    } else {
      try {
        return Math.trunc(pValor);
      } catch (error) {
        return 0;

      }

    }
  }


  static convertStrddMMyyyToDate(data: string): Date {
    try {
      console.log('entrou 81 ', data)

      if (data != null || data == "") {
        return null
      } else if (data.length > 10) {
        var momentDate = moment(data);
        momentDate.format('dd/mm/yyyy hh:ii:ss');
        return momentDate.toDate();

      } else {
        var momentDate = moment(data);
        momentDate.format('dd/mm/yyyy');
        return momentDate.toDate();
      }
    } catch (error) {
      return null;
    }

  }





  static convertDateTimeStr(data: string): string {
    console.log('o que entrou ', data)
    let mRetorno: string = "";
    if (data == null || data == "") {
      return null
    } else if (data.length > 10) {
      mRetorno = moment(data).format('DD/MM/YYYY hh:mm:ss');
    } else {
      mRetorno = moment(data).format('DD/MM/YYYY');
    }

    console.log('retorno 114 ', mRetorno)
    return mRetorno;
  }


  static convertMesAnoToDateJson(pInicial: boolean, pMesAno: string): string {
    if (pMesAno == null || pMesAno.length < 1) {
      return null
    } else {
      //      console.log('mesano chegou ',pMesAno, ' mes str(0,2) ', pMesAno.substring(0, 2) + " ano ", +pMesAno.substring(2, 6));

      let mData = "01/" + pMesAno.substring(0, 2) + "/" + pMesAno.substring(2, 6);
      if (!pInicial) {
        mData = this.getUltimoDiaDoMesStr(mData);
      }
      //    console.log(  (pInicial===true ? 'INICIAL ' : ' FINAL '), ' data sem formatar ', mData);
      return mData;
      //      return moment(mData).format('DD/MM/YYYY');
    }
  }

  static getUltimoDiaDoMesStr(data: string): string {

    let mDataAm = FuncoesGerais.soNumero(data);
    //    console.log('data ', data, ' ano mes ', mDataAm.substring(4, 8)
    //      + ' mes ' + mDataAm.substring(2, 4) + ' dia ' + mDataAm.substring(0, 2));


    let mDataNova = mDataAm.substring(4, 8) + '-' + mDataAm.substring(2, 4) + '-' + mDataAm.substring(0, 2);
    let mData: Date;

    try {
      mData = new Date(mDataNova);
    } catch (error) {
      mData = null;
    }

    // console.log('datanova ',mDataNova,' mData ', mData);

    mData = new Date(mData.getFullYear(), mData.getMonth() + 2, 0);

    //    console.log('data chegou ', data, 'data saiu ', mData);

    return moment(mData).format('DD/MM/YYYY');
  }



  static convertDateTime(data: number) {
    if (data <= 0) {
      return null
    } else {
      return moment(data).format('DD/MM/YYYY hh:mm:ss');
    }
  }

  static convertDateNumber(data: number) {
    if (data <= 0) {
      return null
    } else {
      return moment(data).format('DD/MM/YYYY');
    }
  }


  static convertDate(data: Date) {
    if (data == null) {
      return null
    } else {


      return moment(data).format('DD/MM/YYYY');

      /*      
        let formatter = new Intl.DateTimeFormat('pt-BR');
        return formatter.format(data);
        */

    }
  }


  static convertDateTimeSeg(data: Date) {
    if (data === null) {
      return null
    } else {
      return moment(data).format('DD/MM/YYYY hh:mm:ss');
    }
  }





  static formatarTimeNumber(data: number) {
    if (data === null) {
      return null
    } else {
      return moment(data).format('hh:mm:ss');
    }
  }




  static soNumero(param: string) {
    if (param == null) return ""
    else {

      param = param.trim();
      return param.replace(/\D/g, '');
    }
  }

  static validarCPF(cpf: string) {
    if (cpf === null) {
      return false;
    }
    cpf = this.soNumero(cpf);

    if (cpf.length !== 11) {
      return false;
    }
    if ((cpf === '00000000000') || (cpf === '11111111111')
      || (cpf === '22222222222') || (cpf === '33333333333')
      || (cpf === '44444444444') || (cpf === '55555555555') || (cpf === '66666666666')
      || (cpf === '77777777777') || (cpf === '88888888888') || (cpf === '99999999999')) {
      return false;
    }

    let numero = 0;
    let caracter = '';
    const numeros = '0123456789';
    let j = 10;
    let somatorio = 0;
    let resto = 0;
    let digito1 = 0;
    let digito2 = 0;
    let cpfAux = '';
    cpfAux = cpf.substring(0, 9);

    for (let i = 0; i < 9; i++) {
      caracter = cpfAux.charAt(i);
      if (numeros.search(caracter) === -1) {
        return false;
      }
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito1 = 11 - resto;
    if (digito1 > 9) {
      digito1 = 0;
    }
    j = 11;
    somatorio = 0;
    cpfAux = cpfAux + digito1;
    for (let i = 0; i < 10; i++) {
      caracter = cpfAux.charAt(i);
      numero = Number(caracter);
      somatorio = somatorio + (numero * j);
      j--;
    }
    resto = somatorio % 11;
    digito2 = 11 - resto;
    if (digito2 > 9) {
      digito2 = 0;
    }
    cpfAux = cpfAux + digito2;
    if (cpf !== cpfAux) {
      return false;
    } else {
      return true;
    }
  };


  // tslint:disable-next-line:typedef-whitespace
  static validarCnpj(ccnpj: String) {
    // tslint:disable-next-line:no-var-keyword
    var str = ccnpj;
    str = str.replace('.', '');
    str = str.replace('.', '');
    str = str.replace('.', '');
    str = str.replace('-', '');
    str = str.replace('/', '');
    // tslint:disable-next-line:prefer-const
    let cnpj = str;
    // tslint:disable-next-line:no-var-keyword
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    // tslint:disable-next-line:curly
    if (cnpj.length < 14 && cnpj.length < 15)
      return false;
    // tslint:disable-next-line:curly
    for (i = 0; i < cnpj.length - 1; i++)
      // tslint:disable-next-line:triple-equals
      if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    if (!digitos_iguais) {
      tamanho = cnpj.length - 2;
      numeros = cnpj.substring(0, tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        // tslint:disable-next-line:curly
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      //            console.log("resultado " + resultado + " digitos " + digitos.charAt(0));

      // tslint:disable-next-line:curly
      if (resultado != digitos.charAt(0)) {
        //            console.log("errado no primeiro ");
        return false;
      }
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        // tslint:disable-next-line:curly
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) {
        //            console.log("errado no 124 resultado "+resultado+" digitos "+digitos.charAt(1));
        return false;
      }
      return true;
    }
    // tslint:disable-next-line:one-line
    else
      // tslint:disable-next-line:curly
      return false;
  }





  static toDouble(pValor: any) {
    return (pValor == undefined ? 0 : parseFloat(pValor));

  }

  static toInt(pValor: any) {

    if (pValor) {
      return parseInt(pValor);
    }
    return 0;

  }

  //          safeCallOrNull(pValor, () => {
  //            return ((pValor==undefined || pValor==NaN) ? 0  : parseInt(pValor));

  /*
  
  safeCall(this.instanceTableList, () => {
      this.registroArmaForm.registroArmas = [];
      this.registroArmas = [];
      this.instanceTableList.fillDataNoPage([]);
    });
  
      }
  
    */
  static fMascaracpfCnpj(v) {

    if (v == null) {
      return "";
    }
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "")

    if (v.length < 14) { //CPF

      //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, "$1.$2")

      //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d)/, "$1.$2")

      //Coloca um hífen entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    } else { //CNPJ

      //Coloca ponto entre o segundo e o terceiro dígitos
      v = v.replace(/^(\d{2})(\d)/, "$1.$2")

      //Coloca ponto entre o quinto e o sexto dígitos
      v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")

      //Coloca uma barra entre o oitavo e o nono dígitos
      v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")

      //Coloca um hífen depois do bloco de quatro dígitos
      v = v.replace(/(\d{4})(\d)/, "$1-$2")

    }

    return v
  }


  static fRetirarCaracteresEspeciais(pTexto: String) {
    let str = pTexto;
    str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
    str = str.replace(/[àáâãäå]/g, "a");
    str = str.replace(/[ÈÉÊË]/g, "E");
    return str.replace(/[^a-z0-9_]/gi, '');
  }



  static fRetornaFormatado(pValor: any, pDataMask: string) {

    try {


      if (pValor == null || pDataMask == null) {
        return pValor;
      }


      let mValor: string = pDataMask.toLowerCase();
      switch (mValor) {
        case 'valorboolean':
          return pValor == 1 ? "SIM" : "NAO";

        case 'datetime':
          return moment(pValor).format('DD/MM/YYYY HH:mm:ss');
        case 'date':
          return moment(pValor).format('DD/MM/YYYY');
        case 'valor2dec':
          //          console.log('chegou valor 2 dec valor ', pValor, 'novo valor ',ParseFloat(FuncoesGerais.toDouble(pValor), 2))
          return ParseFloat(FuncoesGerais.toDouble(pValor), 2);
        case 'valor3dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 3);
        case 'valor4dec':
          return ParseFloat(FuncoesGerais.toDouble(pValor), 4);

        default:


          return pValor;
      }


    } catch (error) {

      console.log('erro ', error);
      return pValor;
    }
  }


  static fInsereEsquerda(pTexto: String, pCar: string, length: number) {

    //  console.log(pCar.repeat(length - pTexto.length) + pTexto);

    //    console.log('length ',length, ' p texto lendtth '+pTexto.length, ' ptexto '+pTexto,' car ', pCar);


    return pCar.repeat(length - pTexto.length) + pTexto;

  }

  static fInsereDireita(pTexto: String, pCar: string, length: number) {


    return pCar.repeat(length - pTexto.length) + pTexto;

  }



  static toFilesBase64(
    files: File[],
    selectedFiles: SelectedFiles[]
  ): Observable<SelectedFiles[]> {
    const result = new AsyncSubject<SelectedFiles[]>();
    if (files?.length) {
      Object.keys(files)?.forEach(async (file, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = (e) => {
          selectedFiles = selectedFiles?.filter(
            (f) => f?.name != files[i]?.name
          );
          selectedFiles.push({
            name: files[i]?.name,
            file: files[i],
            base64: reader?.result as string,
          });
          result.next(selectedFiles);
          if (files?.length === i + 1) {
            result.complete();
          }
        };
      });
      return result;
    } else {
      result.next([]);
      result.complete();
      return result;
    }
  }

}


export interface SelectedFiles {
  name: string;
  file: any;
  base64?: string;
}
