import { Injectable } from '@angular/core';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { CnpjValidatorDirective } from '@base-core/directive/cnpj-validation.directive';
import { CpfValidatorDirective } from '@base-core/directive/cpf-validator.directive';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {

    cpf(control: AbstractControl): ValidationErrors | null {
        return new CpfValidatorDirective().validate(control);
    }

    cnpj(control: AbstractControl): ValidationErrors | null {
        return new CnpjValidatorDirective().validate(control);
    }
}
