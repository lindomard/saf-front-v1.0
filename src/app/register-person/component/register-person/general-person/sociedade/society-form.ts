import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { SocietyEntity } from '@register/domain/entities/sociedade-entity.model';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemTable } from '@base-shared/table-list/table-list.component';
import { ItemSelect } from '@base-shared/select/select.component';

export function instanceSocietyForm() {
    return new SocietyForm();
}

export class SocietyForm {

    public handleClickAdd: { (): void }

    private _society: SocietyEntity[] = [];

    constructor() {
        this.form.disable();
    }

    get society(): SocietyEntity[] {
        return this._society;
    }

    set society(society: SocietyEntity[]) {
        this._society = society;
    }

    private clickAdd() {
        return () => this.handleClickAdd();
    }

    private _form = new UntypedFormGroup({
        id: new UntypedFormControl(null),
        nome: new UntypedFormControl(null, [Validators.required, Validators.maxLength(30)]),
        quota: new UntypedFormControl(null, [Validators.required]),
        cargo: new UntypedFormControl(null, [Validators.required, Validators.maxLength(60)]),
        assinaturaConjunta: new UntypedFormControl(null, [Validators.required, Validators.maxLength(30)]),
        capitalSocial: new UntypedFormControl(null, [Validators.required, Validators.maxLength(30)]),
    });

    get form(): UntypedFormGroup {
        return this._form;
    }

    joinSignatures: ItemSelect[] = [
        { id: 0, name: 'Sim'},
        { id: 1, name: 'Não'},
    ]

    private loadingName(): FormBuildConfig {
        return {
            control: this.form.get('nome') as UntypedFormControl,
            type: FormItemType.TEXT,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3,
            params: {
                label: 'Sócio'
            }
        }
    }

    private loadingShare(): FormBuildConfig {
        return {
            control: this.form.get('quota') as UntypedFormControl,
            type: FormItemType.INPUT_MONEY,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Participação'
            }
        }
    }

    private loadingCharge(): FormBuildConfig {
        return {
            control: this.form.get('cargo') as UntypedFormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Cargo'
            }
        }
    }

    private loadingJoinSignature(): FormBuildConfig {
        return {
            control: this.form.get('assinaturaConjunta') as UntypedFormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Assinatura Conjunta',
                options: this.joinSignatures
            }
        }
    }

    private loadingShareCapital(): FormBuildConfig {
        return {
            control: this.form.get('capitalSocial') as UntypedFormControl,
            type: FormItemType.INPUT_MONEY,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Capital Social'
            }
        }
    }

    private loadingButtonAdd(): FormBuildConfig {
        return {
            type: FormItemType.BTN_RAISED,
            columnXl: 1,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Adicionar',
                icon: 'user-plus',
                form: this.form
            },
            clickEvent: this.clickAdd()
        }
    }

    get fields(): FormBuildConfig[] {
        return [
            this.loadingName(),
            this.loadingShare(),
            this.loadingCharge(),
            this.loadingShareCapital(),
            this.loadingJoinSignature(),
            this.loadingButtonAdd()
        ]
    }

    displayColumns: string[] = [
        'nome',
        'quota',
        'assinaturaConjunta',
        'capitalSocial',
        'delete',
        'edit'
    ];

    get itemsTable(): ItemTable[] {
        return [
            {
                columnName: 'nome',
                headerName: 'Sócio'
            },
            {
                columnName: 'quota',
                headerName: 'Quota'
            },
            {
                columnName: 'assinaturaConjunta',
                headerName: 'Ass. Conjunta'
            },
            {
                columnName: 'capitalSocial',
                headerName: 'Capital Social'
            },
        ];
    }
}