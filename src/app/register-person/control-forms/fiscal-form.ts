import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemSelect } from '@base-shared/select/select.component';

export function instanceFiscalForm() {
    return new FiscalForm();
}

export class FiscalForm {

    private _form = new UntypedFormGroup({
        crt: new UntypedFormControl(null),
        consumidor: new UntypedFormControl(0),
        aliquotaEspecial: new UntypedFormControl(null),
        isentoImpostos: new UntypedFormControl(0),
    });

    constructor() {
        this._form.disable();
    }
    optionConsumidorFinal: ItemSelect[] = [
        { id: 0, name: 'Não' },
        { id: 1, name: 'Sim' },
    ];

    optionIsento: ItemSelect[] = [
        { id: 0, name: 'Não' },
        { id: 1, name: 'Isento' },
    ];

    get form(): UntypedFormGroup {
        return this._form;
    }

    get fields(): FormBuildConfig[] {
        return [
            {
                control: this.form.get('crt') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'Regime Tributário',
                    type: 'number'
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
            },
            {
                control: this.form.get('consumidor') as UntypedFormControl,
                type: FormItemType.SELECT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Consumidor Final',
                    options: this.optionConsumidorFinal
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 9,
                columnLg: 9,
                columnMd: 9,
            },
            {
                control: this.form.get('isentoImpostos') as UntypedFormControl,
                type: FormItemType.SELECT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Isento',
                    options: this.optionIsento
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 9,
                columnLg: 9,
                columnMd: 9,
            },
            {
                control: this.form.get('aliquotaEspecial') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Alíquota Especial de Icms'
                }
            },
        ]
    }
}