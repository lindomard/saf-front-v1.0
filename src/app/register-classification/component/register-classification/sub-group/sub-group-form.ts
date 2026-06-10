import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuildConfig, FormItemType } from "@base-shared/form-build/form-build.component";

export const nameControlIdCategorySubGroup = 'idCategory';
export const nameControlCategorySubGroup = 'category';
export const nameControlIdDepartmentSubGroup = 'idDepartment';
export const nameControlDepartmentSubGroup = 'department';
export const nameControlIdGroupSubGroup = 'idGroup';
export const nameControlGroupSubGroup = 'group';
export const nameControlIdSubGroup = 'idSubGroup';
export const nameControlSubGroup = 'subGroup';

@Injectable()
export class SubGroupForm {

    private _form = new FormGroup({
        idCategory: new FormControl(),
        category: new FormControl(),
        idDepartment: new FormControl(),
        department: new FormControl(),
        idGroup: new FormControl(),
        group: new FormControl(),
        idSubGroup: new FormControl(),
        subGroup: new FormControl(),
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
            this.idSubGroup(),
            this.subGroup(),
            this.btnAdd()
        ];
    }


    private idCategory(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdCategorySubGroup) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private category(): FormBuildConfig {
        return {
            control: this.form.get(nameControlCategorySubGroup) as FormControl,
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
            control: this.form.get(nameControlIdDepartmentSubGroup) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private department(): FormBuildConfig {
        return {
            control: this.form.get(nameControlDepartmentSubGroup) as FormControl,
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
            control: this.form.get(nameControlIdGroupSubGroup) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private group(): FormBuildConfig {
        return {
            control: this.form.get(nameControlGroupSubGroup) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Grupo'
            }
        }
    }

    private idSubGroup(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdSubGroup) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Código',
                type: 'number'
            }
        }
    }

    private subGroup(): FormBuildConfig {
        return {
            control: this.form.get(nameControlSubGroup) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Sub-Grupo'
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