import { FormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';

export function instanceFinanceiroForm() {
    return new FinanceiroForm();
}

export class FinanceiroForm {

    private _form = new FormGroup({

    });

    get fom(): FormGroup {
        return this._form;
    }

    get fields(): FormBuildConfig[] {
        return [
            // {

            // }
        ]
    }
}