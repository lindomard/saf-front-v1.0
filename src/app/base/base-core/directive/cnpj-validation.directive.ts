import { NG_VALIDATORS, ValidatorFn, Validator, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { CnpjFuction } from '@base-core/function/cnpj.anotation';

@Directive({
    selector: '[valCnpj][ngModel]',
    providers: [
      {
        provide: NG_VALIDATORS,
        useExisting: CnpjValidatorDirective,
        multi: true
      }
    ]
  })
  export class CnpjValidatorDirective implements Validator {
    private validator: ValidatorFn;
    private _onChange: () => void;
  
    @Input()
    get validation(): ValidatorFn | null { return this.validator; }
  
    set validation(value: ValidatorFn | null) {
      this.validator =  value;
      if (this._onChange) { this._onChange(); }
    }
  
    constructor() {
      this.validator = this.cnpjValidator();
    }
  
    validate (c: AbstractControl) {
      return this.validator(c);
    }
  
    private cnpjValidator (): ValidatorFn {
      return (c: AbstractControl) => {
        const isValid = new CnpjFuction(c.value).validate();
        if (isValid) {
          return null;
        } else {
          return {
            cnpjvalidator: {
              valid: false
            }
          };
        }
      };
    }
  
    registerOnValidatorChange(fn: () => void): void { this._onChange = fn; }
  }
  