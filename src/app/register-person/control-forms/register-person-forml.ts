import { FormGroup, FormControl } from '@angular/forms';
import { FormItemType } from '@base-shared/form-build/form-build.component';


export function instanceRegisterPeronForm()  {
    return new RegisterPersonForm()
}  

export class RegisterPersonForm {
    
    private registerForm = new FormGroup({
        fantasia: new FormControl(null),
        telefone: new FormControl(null),
        situacao: new FormControl(null),
    });

    constructor() {
        this.registerForm.disable();
    }

    get form(): FormGroup {
        return this.registerForm;
    }

    get fields() {
        return [
            {
              control: this.form.get('fantasia') as FormControl,
              type: FormItemType.TEXT,
              columnXl: 4,
              columnLg: 4,
              columnMd: 4,
              params: {
                label: 'Fantasia'
              } 
            },
            {
              control: this.form.get('telefone') as FormControl,
              type: FormItemType.TEXT,
              columnXl: 2,
              columnLg: 2,
              columnMd: 2,
              params: {
                label: 'Telefone'
              } 
            },
            {
              control: this.form.get('situacao') as FormControl,
              type: FormItemType.SELECT,
              columnXl: 2,
              columnLg: 2,
              columnMd: 2,
              params: {
                label: 'Situação',
                options: this.situacoesOptions
              } 
            },
        ];
    }

    get situacoesOptions() {
        return  [
            {id: 0, name: 'ATIVO'}, 
            {id: 1, name: 'INATIVO'}, 
            {id: 2, name: 'PENDENTE'}, 
            {id: 3, name: 'LISTA NEGRA'}
        ];
    }
}