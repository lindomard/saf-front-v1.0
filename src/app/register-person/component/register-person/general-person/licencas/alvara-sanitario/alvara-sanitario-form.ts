import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemSelect } from '@base-shared/select/select.component';
import { ItemTable } from '@base-shared/table-list/table-list.component';
import { AlvaraSanitarioEnity } from '@register/domain/entities/alvara-sanitario-entity.model';

export function instanceAlvaraSanitarioForm() {
    return new AlvaraSanitarioForm();
}

export const nameControlAlvaraSanitrioTipo = 'tipo';

export class AlvaraSanitarioForm {

    public handleClickAdd: () => void;

    private _alvarasSanitarios: AlvaraSanitarioEnity[] = [];

    get alvaraSanitarios(): AlvaraSanitarioEnity[] {
        return this._alvarasSanitarios;
    }

    set alvaraSanitarios(alvaraSanitarios: AlvaraSanitarioEnity[]) {
        this._alvarasSanitarios = alvaraSanitarios;
    }

    private _form = new UntypedFormGroup({
        id: new UntypedFormControl(null),
        tipo: new UntypedFormControl(null),
        numero: new UntypedFormControl(null, [Validators.required]),
        data: new UntypedFormControl(null, [Validators.required]),
    });

    get form(): UntypedFormGroup {
        return this._form;
    }

    constructor() {
        this.form.disable();
    }

    private clickAdd() {
        return () => this.handleClickAdd();
    }

    get optionsAlvara(): ItemSelect[] {
        return [
            { id: 1, name: 'ALVARÁ ANVISA' },
            { id: 2, name: 'ALVARÁ MUNICIPAL' },
        ];
    }

    get fields(): FormBuildConfig[] {
        return [
            {
                type: FormItemType.TITLE,
                params: {
                    label: 'Controles Sanitarios'
                }
            },
            {
                control: this.form.get('tipo') as UntypedFormControl,
                type: FormItemType.SELECT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Tipo',
                    options: this.optionsAlvara
                }
            },
            {
                control: this.form.get('numero') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Alvará'
                }
            },
            {
                control: this.form.get('data') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Validade',
                    type: 'date'
                }
            },
            {
                type: FormItemType.BTN_RAISED,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Adicionar',
                    icon: 'user-plus',
                    form: this.form
                },
                clickEvent: this.clickAdd()
            },
        ];
    }

    displayColumns: string[] = [
        'tipo',
        'numero',
        'data',
        'edit',
        'delete',
    ];

    get itemsTable(): ItemTable[] {
        return [
            {
                columnName: 'tipo',
                headerName: 'Tipo',
                percent: '20%'
            },
            {
                columnName: 'numero',
                headerName: 'Alvará'
            },
            {
                columnName: 'data',
                headerName: 'Vencimento'
            }
        ];
    }
}
