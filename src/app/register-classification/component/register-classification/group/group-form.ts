import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuildConfig, FormItemType } from "@base-shared/form-build/form-build.component";

export const nameControlIdCategoryGroup = 'idCategory';
export const nameControlCategoryGroup = 'category';
export const nameControlIdDepartmentGroup = 'idDepartment';
export const nameControlDepartmentGroup = 'department';
export const nameControlIdGroup = 'idGroup';
export const nameControlNameGroup = 'group';

@Injectable()
export class GroupForm {

    private _form = new FormGroup({
        idCategory: new FormControl(),
        category: new FormControl(),
        idDepartment: new FormControl(),
        department: new FormControl(),
        idGroup: new FormControl(),
        group: new FormControl(),
    });

    constructor() {
        this._form.disable();
    }

    get form(): FormGroup {
        return this._form
    }

    get fields(): FormBuildConfig[] {
        return [
            this.idCategory(),
            this.category(),
            this.idDepartment(),
            this.department(),
            this.idGroup(),
            this.group(),
            this.btnAdd()
        ];
    }

    private idCategory(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdCategoryGroup) as FormControl,
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
            control: this.form.get(nameControlCategoryGroup) as FormControl,
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
            control: this.form.get(nameControlIdDepartmentGroup) as FormControl,
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
            control: this.form.get(nameControlDepartmentGroup) as FormControl,
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
            control: this.form.get(nameControlIdGroup) as FormControl,
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
            control: this.form.get(nameControlNameGroup) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Grupo'
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
}