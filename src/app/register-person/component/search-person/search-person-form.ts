import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemTable } from '@base-shared/table-list/table-list.component';
import { ItemSearch, SituationClient } from '@register/domain/entities/search.entity';

export function instanceSearchPersonForm() {
    return new SearchPersonForm();
}

export const nameControlFilterOne = 'filterOne';
export const nameControlFilterTwo = 'filterTwo';
export const nameControlSituation = 'situation';
export const nameControlValueFilterOne = 'valueFilterOne';
export const nameControlValueFilterTwo = 'valueFilterTwo';


export class SearchPersonForm {
    
    public handlerSeach: { (): void };

    private onListenerSearch(): Function {
        return () => this.handlerSeach();
    }

    private searchPersonform = new UntypedFormGroup({
        filterOne: new UntypedFormControl(ItemSearch.Code),
        valueFilterOne: new UntypedFormControl(null),
        valueFilterTwo: new UntypedFormControl(null),
        filterTwo: new UntypedFormControl(null),
        situation: new UntypedFormControl(SituationClient.All),
    });

    constructor() { }

    get form(): UntypedFormGroup {
        return this.searchPersonform;
    }

    private loadFilterByFirstFilter(): FormBuildConfig {
        return {
            control: this.form.get(nameControlFilterOne) as UntypedFormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Consultar por',
                options: this.optionsSearchFor
            }
        };
    }

    private loadValueFilterOne(): FormBuildConfig {
        return {
            control: this.form.get('valueFilterOne') as UntypedFormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: '...'
            }
        }
    }

    private loadValueFilterTwo(): FormBuildConfig {
        return {
            control: this.form.get('valueFilterTwo') as UntypedFormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: '...'
            }
        }
    }

    private loadFilterBySecondFilter(): FormBuildConfig {
        return {
            control: this.form.get('filterTwo') as UntypedFormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Consultar por',
                options: this.optionsSearchFor,
                idComponent: 'filterTwo'
            }
        };
    }

    private loadFilterByStatus(): FormBuildConfig {
        return {
            control: this.form.get(nameControlSituation) as UntypedFormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
                label: 'Filtrar por status',
                options: this.situacoesOptions,
                idComponent: 'filterOne'
            }
        };
    }

    private loadButtonSearch(): FormBuildConfig {
        return {
            type: FormItemType.BTN_RAISED,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
            params: {
                label: 'Pesquisar'
            },
            clickEvent: this.onListenerSearch()
        };
    }

    get fields(): FormBuildConfig[] {
        return [
            this.loadFilterByFirstFilter(),
            this.loadValueFilterOne(),
            this.loadFilterBySecondFilter(),
            this.loadValueFilterTwo(),
            this.loadFilterByStatus(),
            this.loadButtonSearch()
        ];
    }

    optionsSearchFor = [
        { id: ItemSearch.Code, name: 'Cod. Cliente' },
        { id: ItemSearch.CompanyName, name: 'Razão Social' },
        { id: ItemSearch.FantansyName, name: 'Nome Fantasia' },
        { id: ItemSearch.CNPJ, name: 'CNPJ/CPF' },
        { id: ItemSearch.Type, name: 'Tipo' },
        { id: ItemSearch.City, name: 'Cidade' },
    ];

    get situacoesOptions() {
        return [
            { id: SituationClient.All, name: 'TODAS' },
            { id: SituationClient.Active, name: 'ATIVO' },
            { id: SituationClient.Inative, name: 'INATIVO' },
            { id: SituationClient.Pending, name: 'PENDENTE' },
            { id: SituationClient.BlackList, name: 'LISTA NEGRA' }
        ];
    }

    get displayColumns(): string[] {
        return [
            'id',
            'companyName',
            'cnpj',
            'city',
            'uf',
            'type',
            'phone',
            'situation'
        ];
    }

    get itensTable(): ItemTable[] {
        return [
            {
                columnName: 'id',
                headerName: 'Código',
                percent: `8%`
            },
            {
                columnName: 'companyName',
                headerName: 'Razão Social/Nome Fantasia',
                headerMobile: 'Razão S.',
                percent: '28%'
            },
            {
                columnName: 'cnpj',
                headerName: 'Cnpj',
                percent: '12%'
            },
            {
                columnName: 'city',
                headerName: 'Cidade',
                percent: '12%'
            },
            {
                columnName: 'uf',
                headerName: 'UF',
                percent: '8%'
            },
            {
                columnName: 'type',
                headerName: 'Tipo/Categoria',
                percent: '10%'
            },
            {
                columnName: 'phone',
                headerName: 'Telefone',
                percent: '12%'
            },
            {
                columnName: 'situation',
                headerName: 'Situação',
                percent: '10%'
            }
        ];
    }
}