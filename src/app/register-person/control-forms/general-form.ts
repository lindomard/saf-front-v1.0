import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormItemType } from '@base-shared/form-build/form-build.component';
import { EnumMask } from '@base-core/model/mask-enum.model';

import * as moment from 'moment';
import { ItemSelect } from '@base-shared/select/select.component';
import { TypeTitle } from '@base-shared/title/title.component';

export function instanceGeneralForm() {
    return new GeneralForm();
}

export class GeneralForm {

  optionConsumidorFinal: ItemSelect[] = [
    { id: 0, name: 'Não'},
    { id: 1, name: 'Sim'},
  ];

  optionPessoa: ItemSelect[] = [
    { id: 0, name: 'Física'},
    { id: 0, name: 'Jurídica'}
  ];

  public handlerClickCodRaking: { (): void};

    private generalForm = new FormGroup({
        razaoSocial: new FormControl('', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(90)
          ]
        ),
        dataCadastro: new FormControl('', [
            Validators.required
          ]
        ),
        pessoa: new FormControl(this.optionPessoa[0].id),
        cnpj: new FormControl('', [
            Validators.required
          ]
        ),
        dataNascimentoContato: new FormControl('', [
            Validators.required
          ]
        ),
        inscricaoEstatudal: new FormControl('', [
            Validators.required
          ]
        ),
        inscricaoMuniciap: new FormControl('', [
            Validators.max(14)
          ]
        ),
        consumidorFinal: new FormControl(this.optionConsumidorFinal[0].id),
        cep: new FormControl('', [
            Validators.max(9)
          ]
        ),
        codigoCidade: new FormControl('', [
            Validators.max(10)
          ]
        ),
        cidade: new FormControl(null),
        uf: new FormControl(null),
        endereco: new FormControl('', [
          Validators.required,
          Validators.max(60)
        ]),
        numero: new FormControl('', [
            Validators.max(60)
          ]
        ),
        complemento: new FormControl('', [
            Validators.max(60)
          ]
        ),
        bairro: new FormControl(null),
        codRegiao: new FormControl(null),
        regiao: new FormControl(null),
        condominium: new FormControl(null),
        pais: new FormControl(null),
        codRotaEntrega: new FormControl(null),
        rotaEntrega: new FormControl(null),
        referencia: new FormControl(null),
        codigoFilial: new FormControl(null),
        filial: new FormControl(null),
        telefone: new FormControl(null),
        codigoVendedor: new FormControl(null),
        vendedor: new FormControl(null),
        codigoCategoria: new FormControl(null),
        categoria: new FormControl(null),
        profissao: new FormControl(null),
        carteiraTrabalho: new FormControl(null),
        empresa: new FormControl(null),
        telefonePessoal: new FormControl('', [
            Validators.max(60)
          ]
        ),
        rg: new FormControl(null),
        conjuge: new FormControl(null),
        cpf: new FormControl(null),
        rgCojuge: new FormControl(null),
        localTrabalhoConjuge: new FormControl(null),
        telefoneConjuge: new FormControl(null),
        celularConjuge: new FormControl(null),
    });

    constructor() {
        this.generalForm.disable();
    }

    get form() {
        return this.generalForm;
    }

    get fields() {
        return [
          {
            control: this.form.get('pessoa') as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'Pessoa',
              options: this.optionPessoa
            }
          },
          {
            control: this.form.get('razaoSocial') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 8,
            columnLg: 8,
            columnMd: 8,
            params: {
              label: 'Razão Social',
              message: 'Dever ter no mínimo (5) caracteres e no máximo (25). Digitados: '
            }
          },
          
          {
            control: this.form.get('dataCadastro') as FormControl,
            type: FormItemType.GENESIS_CALENDAR,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'Data Cadastro',
            }
          },
          // end line
          {
            control: this.form.get('cnpj') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'CNPJ',
              icon: 'search',
              mask: EnumMask.CNPJ,
              placeholder: '00.000.000/0000'
            },
            clickEvent: () =>  this.searchCnpj()
          },
          {
            control: this.form.get('inscricaoEstatudal') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 4,
            columnLg: 4,
            columnMd: 4,
            params: {
              label: 'Inscrição Estadual'
            }
          },
          {
            control: this.form.get('inscricaoMuniciap') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 4,
            columnLg: 4,
            columnMd: 4,
            params: {
              label: 'Inscrição Municipal'
            }
          },
          {
            control: this.form.get('consumidorFinal') as FormControl,
            type: FormItemType.SELECT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'Consumidor Final',
              options: this.optionConsumidorFinal
            }
          },
          {
            control: this.form.get('cep') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'CEP',
              mask: EnumMask.CEP,
              placeholder: '      -  '
            }
          },
          {
            control: this.form.get('codigoCidade') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'Código',
              icon: 'search',
              type: 'number'
            },
            clickEvent: () => this.searchCodeCity()
          },
          {
            control: this.form.get('cidade') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3,
            params: {
              label: 'Cidade',
              icon: 'plus',
            },
            clickEvent: () => this.searchCity()
          },
          {
            control: this.form.get('codRegiao') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'Código',
              type: 'number'
            },
          },
          {
            control: this.form.get('regiao') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3,
            params: {
              label: 'Região',
              icon: 'search'
            },
            clickEvent: () => this.searchRegionCode()
          },
          // end first line
          {
            control: this.form.get('endereco') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 6,
            columnLg: 6,
            columnMd: 6,
            params: {
              label: 'Endereço',
              message: 'Endereço obrigatório!'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('pais') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 5,
            columnLg: 5,
            columnMd: 5,
            params: {
              label: 'País',
            }
          },
          {
            control: this.form.get('numero') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 2,
            params: {
              label: 'Número',
              type: 'number'
            }
          },
          {
            control: this.form.get('complemento') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 4,
            columnLg: 4,
            columnMd: 4,
            params: {
              label: 'Complemento',
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('condominium') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 5,
            columnLg: 5,
            columnMd: 5,
            params: {
              label: 'Condomínio'
            }
          },
          // end second line
          {
            control: this.form.get('bairro') as FormControl,
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
            columnMd: 1,
          },
          {
            control: this.form.get('referencia') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 5,
            columnLg: 5,
            columnMd: 5,
            params: {
              label: 'Referência'
            }
          },
          {
            control: this.form.get('codRotaEntrega') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
              label: 'Código'
            }
          },
          {
            control: this.form.get('rotaEntrega') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 5,
            columnLg: 5,
            columnMd: 4,
            params: {
              label: 'Rota de Entrega',
              icon: 'search'
            },
            clickEvent: () => this.searchRoteDelivery()
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('telefone') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 5,
            columnLg: 5,
            columnMd: 5,
            params: {
              label: 'Telefone'
            }
          },
          {
            control: this.form.get('codigoVendedor') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
              label: 'Código'
            }
          },
          {
            control: this.form.get('vendedor') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 5,
            columnLg: 5,
            columnMd: 4,
            params: {
              label: 'Vendedor',
              icon: 'search'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('codigoFilial') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
              label: 'Código'
            }
          },
          {
            control: this.form.get('filial') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 4,
            columnLg: 4,
            columnMd: 3,
            params: {
              label: 'Filial',
              icon: 'search'
            }
          },
          {
            control: this.form.get('codigoCategoria') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 1,
            columnLg: 1,
            columnMd: 2,
            params: {
              label: 'Código'
            }
          },
          {
            control: this.form.get('categoria') as FormControl,
            type: FormItemType.INPUT_BUTTON,
            columnXl: 5,
            columnLg: 5,
            columnMd: 4,
            params: {
              label: 'Categoria',
              icon: 'search'
            }
          },
          {
            type: FormItemType.TITLE,
            params: {
              label: 'Dados Pessoais',
              margin: true,
              marginStart: true
            }
          },
          {
            control: this.form.get('profissao') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 4,
            columnLg: 4,
            columnMd: 4,
            params: {
              label: 'Profissão'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('dataNascimentoContato') as FormControl,
            type: FormItemType.GENESIS_CALENDAR,
            columnXl: 2,
            columnLg: 2,
            columnMd: 3,
            params: {
              label: 'Dt. Nascimento',
              message: 'Campo obrigatório'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('carteiraTrabalho') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3,
            params: {
              label: 'Cart. Trabalho',
              type: 'number'
            }
          },
          {
            control: this.form.get('empresa') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 4,
            columnLg: 4,
            columnMd: 4,
            params: {
              label: 'Empresa'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('telefonePessoal') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 3,
            params: {
              label: 'Telefone'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('rg') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3,
            params: {
              label: 'RG/Emissor'
            }
          },
          // end line
          {
            type: FormItemType.TITLE,
            params: {
              label: 'Cônjuge',
              margin: true,
              marginStart: true
            }
          },
          {
            control: this.form.get('conjue') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 4,
            columnLg: 4,
            columnMd: 4,
            params: {
              label: 'Cônjuge'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('cpfConjuge') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
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
            columnMd: 1,
          },
          {
            control: this.form.get('rgConjuge') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3,
            params: {
              label: 'RG/Emissor'
            }
          },
          {
            control: this.form.get('localTrabalhoConjuge') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 4,
            columnLg: 4,
            columnMd: 4,
            params: {
              label: 'Local Trabalho'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('telefoneConjugue') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 2,
            columnLg: 2,
            columnMd: 3,
            params: {
              label: 'Telefone'
            }
          },
          {
            type: FormItemType.SPACE,
            columnXl: 1,
            columnLg: 1,
            columnMd: 1,
          },
          {
            control: this.form.get('celularConjuge') as FormControl,
            type: FormItemType.TEXT,
            columnXl: 3,
            columnLg: 3,
            columnMd: 3,
            params: {
              label: 'Celular'
            }
          },
          // end line
        ];
    }

    private clickCodRank() {
      this.handlerClickCodRaking();
    }

    searchCategory() {
    }

    searchCodSalesman() {
    }

    searchCnpj() {
    }

    searchPostOffices() {
    }
  
    searchRegionCode() {
    }
  
    searchCodeCity() {
    }
  
    searchCity() {
    }
  
    searchRoteDelivery() {
    }

}