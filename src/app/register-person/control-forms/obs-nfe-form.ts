import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';

export function instanceObsNfeForm() {
    return new ObsNfeForm();
}

export class ObsNfeForm {

    constructor() {
        this.form.disable();
    }

    private _form = new UntypedFormGroup({
        obs: new UntypedFormControl(null, [Validators.maxLength(65535)])
    });

    get form(): UntypedFormGroup {
        return this._form;
    }

    get fields(): FormBuildConfig[] {
        return [
            {
                control: this.form.get('obs') as UntypedFormControl,
                type: FormItemType.TEXT_AREA,
                params: {
                    label: 'Observações',
                    rows: '20',
                    name: 'obs-text-area-geral'
                }
            }
        ]
    }
}