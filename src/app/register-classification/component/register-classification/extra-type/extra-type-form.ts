import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuildConfig, FormItemType } from "@base-shared/form-build/form-build.component";

export const nameControlIdCategoryExtraType = 'idCategory';
export const nameControlCategoryExtraType = 'category';
export const nameControlIdDepartmentExtraType = 'idDepartment';
export const nameControlDepartmentExtraType = 'department';
export const nameControlIdGroupExtraType = 'idGroup';
export const nameControlNameGroupExtraType = 'group';
export const nameControlIdSubGroupExtraType = 'idSubGroup';
export const nameControlSubGroupExtraType = 'subGroup';
export const nameControlIdTypeExtraType = 'idType';
export const nameControlTypeExtraType = 'type';
export const nameControlIdExtraType = 'idExtraType';
export const nameControlExtraType = 'extraType';

@Injectable()
export class ExtraTypeForm {

    private _form = new FormGroup({
        idCategory: new FormControl(),
        category: new FormControl(),
        idDepartment: new FormControl(),
        department: new FormControl(),
        idGroup: new FormControl(),
        group: new FormControl(),
        idSubGroup: new FormControl(),
        subGroup: new FormControl(),
        idType: new FormControl(),
        type: new FormControl(),
        idExtraType: new FormControl(),
        extraType: new FormControl()
    });

    get form(): FormGroup {
        return this._form;
    }

    constructor() {
        this._form.disable();
    }

    get fields(): FormBuildConfig[] {
        return [
            this.idCategory(),
            this.category(),
            this.idDepartment(),
            this.department(),
            this.idGroup(),
            this.group(),
            this.space(),
            this.idSubGroup(),
            this.subGroup(),
            this.idType(),
            this.type(),
            this.idExtraType(),
            this.extraType(),
            this.btnAdd()
        ];
    }

    private idCategory(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdCategoryExtraType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private category(): FormBuildConfig {
        return {
            control: this.form.get(nameControlCategoryExtraType) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Selecionar Categoria',
                options: []
            }
        }
    }

    private idDepartment(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdDepartmentExtraType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private department(): FormBuildConfig {
        return {
            control: this.form.get(nameControlDepartmentExtraType) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Selecionar Departmento',
                options: []
            }
        }
    }

    private idGroup(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdGroupExtraType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private group(): FormBuildConfig {
        return {
            control: this.form.get(nameControlNameGroupExtraType) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Grupo',
                options: []
            }
        }
    }

    private idSubGroup(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdSubGroupExtraType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private subGroup(): FormBuildConfig {
        return {
            control: this.form.get(nameControlSubGroupExtraType) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Sub-Grupo'
            }
        }
    }

    private idType(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdTypeExtraType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private type(): FormBuildConfig {
        return {
            control: this.form.get(nameControlTypeExtraType) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Tipo'
            }
        }
    }


    private idExtraType(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdExtraType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private extraType(): FormBuildConfig {
        return {
            control: this.form.get(nameControlExtraType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Tipo Extra'
            }
        }
    }

    private btnAdd(): FormBuildConfig {
        return {
            type: FormItemType.BTN_RAISED,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
            params: {
                label: 'Adicionar',
                icon: 'user-plus',
                form: this.form
            }
        }
    }

    private space(): FormBuildConfig {
        return {
            type: FormItemType.SPACE,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3
        }
    }

}