import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemTable } from '@base-shared/table-list/table-list.component';
import { SocialNetworkEntity } from '@register/domain/entities/social-netwoek-entity.model';
import { ItemOptionList } from '@base-shared/input-field-button/input-field-button.component';

export function instanceSocialNetworkForm() {
    return new SocialNetworkForm();
}

export const nameControlTypeNetwork = 'tipo';

export class SocialNetworkForm {
    
    private _socialNetwork: SocialNetworkEntity[] = [];

    set socialNetwork(SocialNetwork: SocialNetworkEntity[]) {
        this._socialNetwork = SocialNetwork;
    }

    get socialNetwork(): SocialNetworkEntity[] {
        return this._socialNetwork;
    }


    public handleClickAdd: { (): void }

    public handleSelectItem: { (item): void }

    private onListenerItemSelec(item) {
        return this.handleSelectItem(item);
    }


    private clickAdd() {
        return () => this.handleClickAdd();
    }

    private _form = new UntypedFormGroup({
        id: new UntypedFormControl(null),
        tipo: new UntypedFormControl(null, [Validators.required]),
        nome: new UntypedFormControl(null, [Validators.required]),
    });

    constructor() {
        this.form.disable();
    }

    get optionsNetwork(): ItemOptionList[] {
        return [
            { id: 0, value: 'Facebook' },
            { id: 1, value: 'Instagram' },
            { id: 2, value: 'E-mail' },
            { id: 3, value: 'Telegram' },
            { id: 4, value: 'WhatsApp' },
            { id: 5, value: 'Twitter' },
            { id: 6, value: 'Slack' },
        ]
    }

    get form(): UntypedFormGroup {
        return this._form;
    }

    get fields(): FormBuildConfig[] {
        return [
            {
                control: this.form.get('tipo') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Tipo',
                    options: this.optionsNetwork,
                    name: 'type'
                },
                handlerSelected: (item) => this.onListenerItemSelec(item)
            },

            {
                control: this.form.get('nome') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 5,
                columnLg: 5,
                columnMd: 5,
                params: {
                    label: 'Endereço da Rede',
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
        'nome',
        'edit',
        'delete',
    ];

    itemsTable: ItemTable[] = [
        {
            columnName: 'tipo',
            headerName: 'Rede',
            percent: '40%'
        },
        {
            columnName: 'nome',
            headerName: 'Endereço da Rede Social'
        }
    ];
}