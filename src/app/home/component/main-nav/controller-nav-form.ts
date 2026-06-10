import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemOptionList } from '@base-shared/input-field-button/input-field-button.component';
import { Subject } from 'rxjs';

export const NAME_CONTROL_NAV_BAR_FORM_NAME = 'name'

@Injectable({
    providedIn: 'root'
})
export class ControllerNavForm {

    public handleSelectItem: { (item): void };
    $subject = new Subject<string>();

    listenerSearchFunctionName($event) {
        this.$subject.next($event);
    }

    private onListenerItemSelec(item) {
        return this.handleSelectItem(item);
    }

    private _form = new UntypedFormGroup({
        name: new UntypedFormControl('')
    });

    get form(): UntypedFormGroup {
        return this._form;
    }

    constructor() {
        this.form.reset();
    }

    optionsFunctionName: ItemOptionList[] = [
        { id: 1, value: 'cadastro de Clientes', param: { name: 'FER-001', path: 'cadpessoas' } },
        { id: 11, value: 'teste', param: { name: 'FER-011', path: 'teste' } }
    ];

    get fields(): FormBuildConfig[] {
        return [
            {
                control: this.form.get('name') as UntypedFormControl,
                type: FormItemType.TEXT,
                params: {
                    label: 'Buscar por ferramenta',
                    options: this.optionsFunctionName,
                    icon: 'search',
                    name: 'type'
                },
                handlerSelected: (item) => this.onListenerItemSelec(item),
                handlerChange: ($event) => this.listenerSearchFunctionName($event)
            }
        ];
    }

}
