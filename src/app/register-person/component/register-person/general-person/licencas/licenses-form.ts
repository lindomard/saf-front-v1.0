import { Injectable } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemSelect } from '@base-shared/select/select.component';
import { ItemTable } from '@base-shared/table-list/table-list.component';
import { LicensesEntity } from '@register/domain/entities/licenses-entity.model';

export function instanceLicenses() {
    return new LicensesForm()
}

export const nameControlTypeLicense = 'type'
export const nameControlDispatcherLicense = 'dispatcher'
export const nameControlLicense = 'number'
export const nameControlDueDateLicense = 'dueDate'

export const TYPE_SANITARY = 'Sanitário';
export const TYPE_ARMY = 'Exército';
@Injectable()
export class LicensesForm {

    private _licenses: LicensesEntity[] = []


    constructor() {
        this.form.disable();
    }

    private _form = new UntypedFormGroup({
        id: new UntypedFormControl(null),
        type: new UntypedFormControl(null),
        dispatcher: new UntypedFormControl(null),
        number: new UntypedFormControl(null),
        dueDate: new UntypedFormControl(null)
    });

    get licenses(): LicensesEntity[] {
        return this._licenses
    }

    set licenses(licenses: LicensesEntity[]) {
        this._licenses = licenses
    }

    get form(): UntypedFormGroup {
        return this._form
    }

    public handleClickAdd: { (): void }

    private clickAdd() {
        return () => this.handleClickAdd();
    }

    types: ItemSelect[] = [
        { id: 0, name: TYPE_SANITARY },
        { id: 1, name: TYPE_ARMY },
    ];

    dipatchers: ItemSelect[] = [
        { id: 0, name: 'Anvisa' },
        { id: 1, name: 'Municipal' },
        { id: 2, name: 'Sigma' },
        { id: 3, name: 'Sinaram' },
    ];

    private loadingType(): FormBuildConfig {
        return {
            control: this.form.get(nameControlTypeLicense) as UntypedFormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Tipo',
                options: this.types
            }
        }
    }

    private loadingDipatcher(): FormBuildConfig {
        return {
            control: this.form.get(nameControlDispatcherLicense) as UntypedFormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Expedidor',
                options: this.dipatchers
            }
        }
    }

    private loadingNumber(): FormBuildConfig {
        return {
            control: this.form.get(nameControlLicense) as UntypedFormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Alvará/Número'
            }
        }
    }

    private loadingValidity(): FormBuildConfig {
        return {
            control: this.form.get(nameControlDueDateLicense) as UntypedFormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Validade',
                type: 'date'
            }
        }
    }

    private loadingAdd(): FormBuildConfig {
        return {
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
        }
    }

    get fields(): FormBuildConfig [] {
        return [
            this.loadingType(),
            this.loadingDipatcher(),
            this.loadingNumber(),
            this.loadingValidity(),
            this.loadingAdd()
        ]
    }

    displayColumns: string[] = [
        'type',
        'dispatcher',
        'number',
        'dueDate',
        'delete',
        'edit'
    ];

    get itemsTable(): ItemTable[] {
        return [
            {
                columnName: 'type',
                headerName: 'Tipo',
                percent: '20%'
            },
            {
                columnName: 'dispatcher',
                headerName: 'Expedidor'
            },
            {
                columnName: 'number',
                headerName: 'Alvará/Número'
            },
            {
                columnName: 'dueDate',
                headerName: 'Validade'
            }
        ];
    }
}