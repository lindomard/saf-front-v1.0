import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormItemType } from '@base-shared/form-build/form-build.component';

export function instanceEmailForm() {
    return new EmailForm();
}

export class EmailForm {

    private formEmail  =  new UntypedFormGroup({
        email: new UntypedFormControl(null),
        site: new UntypedFormControl(null),
        emailNfe: new UntypedFormControl(null),
        contato: new UntypedFormControl(null)
    });

    constructor() {
        this.formEmail.disable();
    }

    get form() {
        return this.formEmail;
    }

    get fields() {
        return [
            {
              type: FormItemType.TITLE,
              params: {
                label: 'Endereço Eletrônico',
                divider: false
              }
            },
            {
              control: this.form.get('email') as UntypedFormControl,
              type: FormItemType.TEXT,
              columnLg: 6,
              columnXl: 6,
              columnMd: 6,
              params: {
                label: 'E-mail'
              }
            },
            {
              control: this.form.get('site') as UntypedFormControl,
              type: FormItemType.TEXT,
              columnLg: 6,
              columnXl: 6,
              columnMd: 6,
              params: {
                label: 'Site'
              }
            },
            {
              type: FormItemType.TITLE,
              params: {
                label: 'Contato para ennvio da NF-e',
                margin: true
              }
            },
            {
              control: this.form.get('emailNfe') as UntypedFormControl,
              type: FormItemType.TEXT,
              columnLg: 6,
              columnXl: 6,
              columnMd: 6,
              params: {
                label: 'E-mail'
              }
            },
            {
              control: this.form.get('contato') as UntypedFormControl,
              type: FormItemType.TEXT,
              columnLg: 4,
              columnXl: 4,
              columnMd: 4,
              params: {
                label: 'Contato'
              }
            }
          ]
    } 
}