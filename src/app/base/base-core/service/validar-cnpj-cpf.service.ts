import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, Validators } from '@angular/forms';
import { OnlyNumbers } from '@base-core/function/onlyNumbers.formatter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarCnpjCpfService {

  constructor() { }


  public validarCnpj(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

      if (control.value == undefined || control.value == null || control.parent == null) {
        return null;
      }

      let cnpj = control.value;




        return new Observable(obs => {
          obs.next(this.fValidarCnpj(cnpj));
          obs.complete();
        });
    };
  }


  fValidarCnpj(pcnpj: string) {

  


      const cnpj = new OnlyNumbers(pcnpj).format();
  
//      if (cnpj.length !== 14) { return  { 'erro': 'quantidade de digitos invalido'} }; 
  
      if (cnpj === '00000000000000' ||
        cnpj === '11111111111111' ||
        cnpj === '22222222222222' ||
        cnpj === '33333333333333' ||
        cnpj === '44444444444444' ||
        cnpj === '55555555555555' ||
        cnpj === '66666666666666' ||
        cnpj === '77777777777777' ||
        cnpj === '88888888888888' ||
        cnpj === '99999999999999') { return { 'erro': 'numeros repetidos invalido'}; }
  
      let length = cnpj.length - 2;
      let numbers = cnpj.substring(0, length);
      const digits = cnpj.substring(length);
      let sum = 0;
      let pos = length - 7;
  
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) { pos = 9; }
      }
      let resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
      // tslint:disable-next-line:triple-equals
      if (resultado != digits.charAt(0)) { return { 'erro': 'CNPJ invalido!'}; }
  
      length = length + 1;
      numbers = cnpj.substring(0, length);
      sum = 0;
      pos = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += numbers.charAt(length - i) * pos--;
        if (pos < 2) { pos = 9; }
      }
      resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
      // tslint:disable-next-line:triple-equals
      if (resultado != digits.charAt(1)) { return { 'erro': 'CNPJ digito invalido!'}; }
  
      return null;
    }
  
    // inicio


    public validarCpf(): AsyncValidatorFn {
      return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
  


        if (control.value == undefined || control.value == null || control.parent == null) {
          return null;
        }
  
        let cpf = control.value;
  
  
  
  
          return new Observable(obs => {
            obs.next(this.fValidarCpf(cpf));
            obs.complete();
          });
      };
    }
      
    fValidarCpf(pCpf: string) {

      const cpf = new OnlyNumbers(pCpf).format();

        if (cpf) {
          let numbers, digits, sum, i, result, equalDigits;
          equalDigits = 1;
          if (cpf.length < 11) {
            { return  { 'erro': 'quantidade de digitos invalido'} }; 
          }
 
          for (i = 0; i < cpf.length - 1; i++) {
            if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
              equalDigits = 0;
              break;
            }
          }
 
          if (!equalDigits) {
            numbers = cpf.substring(0, 9);
            digits = cpf.substring(9);
            sum = 0;
            for (i = 10; i > 1; i--) {
              sum += numbers.charAt(10 - i) * i;
            }
 
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
 

            if (result !== Number(digits.charAt(0))) {
              { return  { 'erro': 'quantidade de digitos invalido'} }; 
            }
            numbers = cpf.substring(0, 10);
            sum = 0;
 
            for (i = 11; i > 1; i--) {
              sum += numbers.charAt(11 - i) * i;
            }
            result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
 
            if (result !== Number(digits.charAt(1))) {
              { return  { 'erro': 'digito invalido'} }; 
            }
            return null;
          } else {
            { return  { 'erro': 'cpf invalido!'} }; 

          }
       }
     return null;
   };
    // termino

}
