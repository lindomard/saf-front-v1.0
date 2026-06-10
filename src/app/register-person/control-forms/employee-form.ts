import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemSelect } from '@base-shared/select/select.component';
import { EnumMask } from '@base-core/model/mask-enum.model';
import { TypeTitle } from '@base-shared/title/title.component';

export function instanceEmployeeForm() {
    return new EmployeeForm();
}

export class EmployeeForm {

    private employeeForm = new UntypedFormGroup({
        id: new UntypedFormControl(null),
        dataAdmissao: new UntypedFormControl(null),
        nomeCompleto: new UntypedFormControl(null),
        primeiroNome: new UntypedFormControl(null),
        celular: new UntypedFormControl(null),
        email: new UntypedFormControl(null),
        telefone: new UntypedFormControl(null),
        telRecado: new UntypedFormControl(null),
        profissao: new UntypedFormControl(null),
        idDepartamento: new UntypedFormControl(null),
        departamento: new UntypedFormControl(null),
        tipoPessoa: new UntypedFormControl(this.optionsTipoPessoa()[0].id),
        cpf: new UntypedFormControl(null),
        idSetor: new UntypedFormControl(null),
        setor: new UntypedFormControl(null),
        cep: new UntypedFormControl(null),
        endereco: new UntypedFormControl(null),
        numero: new UntypedFormControl(null),
        bairro: new UntypedFormControl(null),
        complemento: new UntypedFormControl(null),
        idCidade: new UntypedFormControl(null),
        cidade: new UntypedFormControl(null),
        condominio: new UntypedFormControl(null),
        referencia: new UntypedFormControl(null),
        pais: new UntypedFormControl(null),
        usuario: new UntypedFormControl(null),
        senha: new UntypedFormControl(null),
        idBanco: new UntypedFormControl(null),
        banco: new UntypedFormControl(null)
    });

    constructor() {
        this.employeeForm.disable();
    }

    get form() {
        return this.employeeForm;
    }

    get fields(): FormBuildConfig[] {
        return [
            {
                type: FormItemType.TITLE,
                params: {
                    label: 'Cadastro de Funcionàrios'
                }
            },
            {
                control: this.form.get('id') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Código',
                    type: 'number'
                }
            },
            {
                control: this.form.get('dataAdmissao') as UntypedFormControl,
                type: FormItemType.GENESIS_CALENDAR,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Dt. Admissão'
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 8,
                columnLg: 8,
                columnMd: 8
            },
            {
                control: this.form.get('nomeCompleto') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'Nome Completo'
                }
            },
            {
                control: this.form.get('primeiroNome') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: '1° Nome'
                }
            },
            {
                control: this.form.get('celular') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Celular'
                }
            },
            {
                control: this.form.get('email') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'E-mail'
                }
            },
            {
                control: this.form.get('telefone') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Telefone'
                }
            },
            {
                control: this.form.get('telRecado') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Tel. Recado'
                }
            },
            {
                control: this.form.get('profissao') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'Profissão'
                }
            },
            {
                control: this.form.get('idDepartamento') as UntypedFormControl,
                type: FormItemType.INPUT_BUTTON,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Cod. Departamento',
                    icon: 'search',
                    name: 'depatamento-e'
                }
            },
            {
                control: this.form.get('departamento') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 4,
                columnLg: 4,
                columnMd: 4,
                params: {
                    label: 'Departamento'
                }
            },
            {
                type: FormItemType.TITLE,
                params: {
                    label: 'Cargo/Funcão',
                    margin: true,
                    typeTitle: TypeTitle.TITLE_DIVIDER
                }
            },
            {
                control: this.form.get('tipoPessoa') as UntypedFormControl,
                type: FormItemType.SELECT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Pessoa',
                    options: this.optionsTipoPessoa()
                }
            },
            {
                control: this.form.get('cpf') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'CPF',
                    mask: EnumMask.CPF
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 1,
                columnLg: 1,
                columnMd: 1
            },
            {
                control: this.form.get('idSetor') as UntypedFormControl,
                type: FormItemType.INPUT_BUTTON,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Cód. Setor',
                    icon: 'search',
                    name: 'setor-e'
                }
            },
            {
                control: this.form.get('setor') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Setor'
                }
            },
            {
                type: FormItemType.TITLE,
                params: {
                    label: 'Endereço',
                    margin: true,
                    typeTitle: TypeTitle.TITLE_DIVIDER
                }
            },
            {
                control: this.form.get('cep') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'CEP',
                    mask: EnumMask.CEP,
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 10,
                columnLg: 10,
                columnMd: 10,
            },
            {
                control: this.form.get('endereco') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'Endereço',
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 1,
                columnLg: 1,
                columnMd: 1
            },
            {
                control: this.form.get('numero') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Número',
                }
            },
            {
                control: this.form.get('bairro') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'Bairro',
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 1,
                columnLg: 1,
                columnMd: 1
            },
            {
                control: this.form.get('complemento') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Complemento',
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2
            },
            {
                control: this.form.get('idCidade') as UntypedFormControl,
                type: FormItemType.INPUT_BUTTON,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Cód. Cidade',
                    icon: 'search',
                    name: 'cidade-e'
                }
            },
            {
                control: this.form.get('cidade') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 4,
                columnLg: 4,
                columnMd: 4,
                params: {
                    label: 'Cidade',
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 1,
                columnLg: 1,
                columnMd: 1
            },
            {
                control: this.form.get('condominio') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Condominío',
                }
            },
            {
                control: this.form.get('referencia') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 6,
                columnLg: 6,
                columnMd: 6,
                params: {
                    label: 'Referência',
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 1,
                columnLg: 1,
                columnMd: 1
            },
            {
                control: this.form.get('pais') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'País',
                }
            },
            {
                type: FormItemType.TITLE,
                params: {
                    label: 'Sistema',
                    typeTitle: TypeTitle.TITLE_DIVIDER,
                    margin: true,
                }
            },
            {
                control: this.form.get('usuario') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Usuário'
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 1,
                columnLg: 1,
                columnMd: 1
            },
            {
                control: this.form.get('senha') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Senha',
                    type: 'password'
                }
            },
            {
                type: FormItemType.GENESIS_BUTTON,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Permissões',
                    form: this.form
                }
            },
            {
                type: FormItemType.SPACE,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3
            },
            {
                control: this.form.get('idBanco') as UntypedFormControl,
                type: FormItemType.INPUT_BUTTON,
                columnXl: 2,
                columnLg: 2,
                columnMd: 2,
                params: {
                    label: 'Cód. Banco',
                    icon: 'search',
                    name: 'banco-e'
                }
            },
            {
                control: this.form.get('banco') as UntypedFormControl,
                type: FormItemType.TEXT,
                columnXl: 3,
                columnLg: 3,
                columnMd: 3,
                params: {
                    label: 'Banco'
                }
            },
        ]
    }

    private optionsTipoPessoa(): ItemSelect[] {
        return [
            { id: 0, name: 'Pessoa'}
        ]
    }
}