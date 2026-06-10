import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemRadioButton } from '@base-shared/radio-button/radio-button.component';

export function instanceFreteForm() {
    return new FreteForm();
}

export enum TypeFrete {
    CIF = 0,
    FOB = 1,
    TERCEIROS = 2,
    SEM_FRETE = 3
}

export class FreteForm {

    private get optionTypeFreteRadio(): ItemRadioButton[] {
        return [
            {
                name: 'cif',
                label: 'CIF - Custo, Seguro e Frete pago pelo emitente',
                value: TypeFrete.CIF,
                radioGroup: 'typeFrete'
            },
            {
                name: 'fob',
                label: 'FOB - Custo, Seguro e Frete pago pelo destinatário',
                value: TypeFrete.FOB,
                radioGroup: 'typeFrete'
            },
            {
                name: 'terceiros',
                label: 'Terceiros',
                value: TypeFrete.TERCEIROS,
                radioGroup: 'typeFrete'
            },
            {
                name: 'semFrete',
                label: 'Sem Frete',
                value: TypeFrete.SEM_FRETE,
                radioGroup: 'typeFrete'
            }
        ]
    }

    private _form = new UntypedFormGroup({
        transportadora: new UntypedFormControl(null),
        transportadoraCodigo: new UntypedFormControl(null),
        typeFrete: new UntypedFormControl(this.optionTypeFreteRadio[3].value)
    });

    constructor() {
        this.form.disable();
    }


    get form(): UntypedFormGroup {
        return this._form;
    }

    get fields(): FormBuildConfig[] {
        return [
            {
                control: this.form.get('transportadoraCodigo') as UntypedFormControl,
                type: FormItemType.INPUT_BUTTON,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Cod. Trasportadora',
                    type: 'number',
                    icon: 'search',
                    name: 'transportadora-frete'
                }
            },
            {
                control: this.form.get('transportadora') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'Trasportadora'
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
            },
            {
                control: this.form.get('typeFrete') as UntypedFormControl,
                type: FormItemType.RADIO_BUTTON,
                params: {
                    items: this.optionTypeFreteRadio
                }
            },
        ];
    }
}