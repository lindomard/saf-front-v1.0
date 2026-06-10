import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuildConfig, FormItemType } from "@base-shared/form-build/form-build.component";

export const nameControlIdDepartment = 'id';
export const nameControlCategoryDepartment = 'category';
export const nameControlDepartmentNameDepartment = 'departmentName';

@Injectable()
export class DepartmentForm {

    private _form = new FormGroup({
        id: new FormControl(),
        category: new FormControl(),
        departmentName: new FormControl()
    });

    constructor() {
        this._form.disable();
    }

    get form(): FormGroup {
        return this._form;
    }

    get fiels(): FormBuildConfig[] {
        return [
            this.selectCategory(),
            this.id(),
            this.departmentName(),
            this.btnAdd()
        ]
    }

    private id(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdDepartment) as FormControl,
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

    private selectCategory(): FormBuildConfig {
        return {
            control: this.form.get(nameControlCategoryDepartment) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Categoria',
                options: []
            }
        }
    }

    private departmentName(): FormBuildConfig {
        return {
            control: this.form.get(nameControlDepartmentNameDepartment) as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Departamento'
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