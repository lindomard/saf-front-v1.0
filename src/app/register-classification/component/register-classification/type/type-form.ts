import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuildConfig, FormItemType } from "@base-shared/form-build/form-build.component";

export const nameControlIdCategoryType = 'idCategory';
export const nameControlCategoryType = 'category';
export const nameControlIdDepartmentType = 'idDepartment';
export const nameControlDepartmentType = 'department';
export const nameControlIdGroupType = 'idGroup';
export const nameControlNameGroupType = 'group';
export const nameControlIdSubGroupType = 'idSubGroup';
export const nameControlSubGroupType = 'subGroup';
export const nameControlIdType = 'idType';
export const nameControlType = 'type';

@Injectable()
export class TypeForm {

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
        type: new FormControl()
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
            this.btnAdd()
        ];
    }

    private idCategory(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdCategoryType) as FormControl,
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
            control: this.form.get(nameControlCategoryType) as FormControl,
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
            control: this.form.get(nameControlIdDepartmentType) as FormControl,
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
            control: this.form.get(nameControlDepartmentType) as FormControl,
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
            control: this.form.get(nameControlIdGroupType) as FormControl,
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
            control: this.form.get(nameControlNameGroupType) as FormControl,
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
            control: this.form.get(nameControlIdSubGroupType) as FormControl,
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
            control: this.form.get(nameControlSubGroupType) as FormControl,
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
            control: this.form.get(nameControlIdType) as FormControl,
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
            control: this.form.get(nameControlType) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Tipo'
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