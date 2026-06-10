import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FormBuildConfig, FormItemType } from "@base-shared/form-build/form-build.component";

export const nameControlIdCategoryClassification = 'id';
export const nameControlCategoryClassification = 'category';

@Injectable()
export class CategoryForm {

    optionsCategory = [
        { id: '0', name: 'Despesa' },
        { id: '1', name: 'Pessoa' },
        { id: '2', name: 'Produto' },
        { id: '3', name: 'Receita' },
    ];

    private _form = new FormGroup({
        id: new FormControl(),
        category: new FormControl(this.optionsCategory[0].id)
    });

    get form(): FormGroup {
        return this._form;
    }

    constructor() {
        this._form.disable();
    }

    get fields(): FormBuildConfig[] {
        return [
            this.id(),
            this.category(),
            this.btnAdd()
        ]
    }

    private id(): FormBuildConfig {
        return {
            control: this.form.get(nameControlIdCategoryClassification) as FormControl,
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
            control: this.form.get(nameControlCategoryClassification) as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Categoria',
                options: this.optionsCategory
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