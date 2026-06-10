import { Injectable } from '@angular/core';

@Injectable()
export class CpfCnpjService {

  constructor() { }

  createMask(num): string {
    if (num) {
      num = num.toString();
      num = num.replace(/\D/g, '');
      switch (num.length) {
          case 4:
              num = num.replace(/(\d+)(\d{3})/, "$1.$2");
              break;
          case 5:
              num = num.replace(/(\d+)(\d{3})/, "$1.$2");
              break;
          case 6:
              num = num.replace(/(\d+)(\d{3})/, "$1.$2");
              break;
          case 7:
              num = num.replace(/(\d+)(\d{3})(\d{3})/, "$1.$2.$3");
              break;
          case 8:
              num = num.replace(/(\d+)(\d{3})(\d{3})/, "$1.$2.$3");
              break;
          case 9:
              num = num.replace(/(\d+)(\d{3})(\d{3})/, "$1.$2.$3");
              break;
          case 10:
              num = num.replace(/(\d+)(\d{3})(\d{3})(\d{1})/, "$1.$2.$3-$4");
              break;
          case 11:
              num = num.replace(/(\d+)(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
              break;
          case 12:
              num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})/, "$1.$2.$3/$4");
              break;
          case 13:
              num = num.replace(/(\d+)(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
              break;
          case 14:
              num = num.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d+)/, "$1.$2.$3/$4-$5");
              break;
      }
    }
    return num;
  }

  validateCPF(cpf: string): boolean {
    let sum, rest;
    if (cpf == undefined || cpf.trim().length === 0 || cpf == "00000000000"){
        return false
    }
    cpf = cpf.replace('.', '').replace('.', '').replace('-', '')

    sum = 0
    for (let i=1; i<=9; i++) {
        sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i)
    }
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
        rest = 0
    }
    if (rest != parseInt(cpf.substring(9, 10)) ) {
        return false
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
    }
    rest = (sum * 10) % 11;

    if ((rest == 10) || (rest == 11)) {
        rest = 0;
    }

    if (rest != parseInt(cpf.substring(10, 11) ) ) {
        return false;
    }
    return true;
  }

  validateCNPJ(cnpj: any): boolean {
      
      const b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

      if ((cnpj = cnpj.replace(/[^\d]/g, '')).length !== 14) {
          return false;
      }
      
      if (/0{14}/.test(cnpj)) {
          return false;
      }
      
      for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
      if(cnpj[12] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;

      for (var i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);
      if(cnpj[13] != (((n %= 11) < 2) ? 0 : 11 - n))
        return false;
      return true;
  }

}
