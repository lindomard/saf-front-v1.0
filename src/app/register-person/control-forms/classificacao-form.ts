import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormItemType } from '@base-shared/form-build/form-build.component';

export function instanceCheckboxForm() {
    return new ClassificacaoForm();
}

export class ClassificacaoForm {

    private classificacao = new UntypedFormGroup({
        classificacao: new UntypedFormControl(false),
        cliente: new UntypedFormControl(false),
        transportadora: new UntypedFormControl(false),
        socio: new UntypedFormControl(false),
        contabilidade: new UntypedFormControl(false),
        fornecedor: new UntypedFormControl(false),
        vendedor: new UntypedFormControl(false),
        funcionario: new UntypedFormControl(false),
        sindicado: new UntypedFormControl(false),
    });

    constructor() {
        this.classificacao.disable();
    }

    get form() {
        return this.classificacao;
    }

    get fields() {
        return [
            {
                type: FormItemType.DIVIDER,
                columnXl: 12,
                columnLg: 12,
                columnMd: 12,
            },
            {
                control: this.form.get('classificacao') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Classificacao',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('cliente') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Cliente',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('contabilidade') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Contabilidade',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('fornecedor') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Fornecedor',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('funcionario') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Funcionário',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('sindicado') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Sindicado',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('socio') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Socio',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('transportadora') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Transportadora',
                  typeLabel: 'uppercase'
                }
            },
            {
                control: this.form.get('vendedor') as UntypedFormControl,
                type: FormItemType.CHECKBOX,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                columnSm: 6,
                params: {
                  label: 'Vendedor',
                  typeLabel: 'uppercase'
                }
            }
        ]
    }
}