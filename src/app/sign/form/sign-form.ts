import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';

export function instanceSignForm() {
    return new SignForm();
}

export class SignForm {

    private _form: UntypedFormGroup = new UntypedFormGroup({
        company: new UntypedFormControl('', Validators.required),
        username: new UntypedFormControl('', Validators.required),
        password: new UntypedFormControl('', Validators.required),
    });

    get form(): UntypedFormGroup {
        return this._form;
    }

    get fields(): FormBuildConfig[] {
        return [
          {
            control: this.form.get('company') as UntypedFormControl,
            type: FormItemType.TEXT,
            params: {
                label: 'Registro',
                type: 'number'
            }
        },
          
          {
            control: this.form.get('username') as UntypedFormControl,
            type: FormItemType.TEXT,
            params: {
                label: 'Usuário'
            }
        },
        {
            control: this.form.get('password') as UntypedFormControl,
            type: FormItemType.TEXT,
            params: {
                label: 'Senha',
                type: 'password'
            }
        }
]
    };
}