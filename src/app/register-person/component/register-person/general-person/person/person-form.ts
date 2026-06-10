import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { EnumMask } from '@base-core/model/mask-enum.model';
import { ValidationService } from '@base-core/service/validation.service';
import { FormBuildConfig, FormItemType } from '@base-shared/form-build/form-build.component';
import { ItemSelect } from '@base-shared/select/select.component';
import { Category } from '@register/data/model/category.model';

export function instancePersonForm(validationService: ValidationService) {
  return new PersonForm(validationService);
}






export const ITEM_LIST_GRPOUP = 'list-group';
export const CPNJ_OR_CPF = 'CPNJ_OR_CPF';
export const SELECT_TYPE_PERSON = 'SELECT_TYPE_PERSON';
export const CIDADE = 'CIDADE';
export const PHONE_PERSON = 'PHONE_PERSON';
export const PHONE_PERSONAL_DATA = 'PHONE_PERSONAL_DATA';

export const nameControlTypePerson = 'typePerson';
export const nameControlDateRegistration = 'dateRegistration';
export const nameControlCityCodePerson = 'cityCode';
export const nameControlCityPerson = 'city';
export const nameControlFinalConsumer = 'finalConsumer';
export const nameControlCNAEPerson = 'cnae';
export const nameControlCepPerson = 'cep';

export const nameControlAddressPerson = 'address';
export const nameControlCountryPerson = 'country';
export const nameControlCnpj = 'cnpj';
export const nameControlRg = 'rg';
export const nameControlPhone = 'phone';
export const nameControlPhoneOption = 'phoneOption';
export const nameControlUfPerson = 'uf';
export const nameControlBranchCode = 'branchCode';
export const nameControlCellPhone = 'cellPhone';
export const nameControlFantasyName = 'fantasyName';
export const nameControlStateRegistration = 'stateRegistration';
export const nameControlMunicipalRegistration = 'municipalRegistration';
export const nameControlBranch = 'branch';
export const nameControlNeighborhood = 'neighborhood';
export const nameControlNumber = 'number';
export const nameControlZone = 'zone';
export const nameControlComplement = 'complement';
export const nameControlCondominium = 'condominium';
export const nameControlReferencePoint = 'referencePoint';
export const nameControlDepartment = 'department';
export const nameControlDepartmentCode = 'departmentCode';
export const nameControlCategoryCode = 'categoryCode';
export const nameControlCategory = 'category';
export const nameControlSubGroup = 'subGroup'
export const nameControlSubGroupCode = 'subGroupCode'
export const nameControlGroup = 'group'
export const nameControlGroupCode = 'groupCode'
export const nameControlSalesmanCode = 'salesmanCode'
export const nameControlSalesman = 'salesman'
export const nameControlRegionCode = 'regionCode'
export const nameControlRegion = 'region'
export const nameControlDeliveryRoute = 'deliveryRoute'
export const nameControlRouteCode = 'routeCode'

export class PersonForm {

  private _categories: Category[] = [];

  set categories(caracterias: Category[]) {
    this._categories = caracterias;
  }

  get categories(): Category[] {
    return this._categories;
  }

  optionsFinalConsumer: ItemSelect[] = [
    { id: 0, name: 'Não' },
    { id: 1, name: 'Sim' },
  ];

  optionsTypePerson: ItemSelect[] = [
    { id: 0, name: 'Jurídica' },
    { id: 1, name: 'Física' }
  ];

  public handleClickCodRaking: () => void;
  public handleClickIdCity: () => void;
  public handleClickCategory: () => void;
  public handleSelectTypePessoa: () => void;
  public handleEventChangeCidade: () => void;
  public handleItemSelected: (item) => void;
  public handlerPhonePerson: () => void;
  public handlerPhonePersonalData: () => void;
  public handlerVerifyCnpjOrCpf: () => void;


  private generalForm = new UntypedFormGroup({
    fantasyName: new UntypedFormControl('', [
      Validators.maxLength(90)
    ]),
    dateRegistration: new UntypedFormControl(''),
    typePerson: new UntypedFormControl(this.optionsTypePerson[0].id),
    cnpj: new UntypedFormControl('', [
      Validators.required, this.validationService.cnpj
    ]),
    rg: new UntypedFormControl('', [
      Validators.maxLength(100)
    ]),
    stateRegistration: new UntypedFormControl('', [
      Validators.maxLength(25)
    ]),
    municipalRegistration: new UntypedFormControl('', [
      Validators.maxLength(14)
    ]),
    finalConsumer: new UntypedFormControl(null),
    cnae: new UntypedFormControl('', [
      Validators.maxLength(50)
    ]),
    cep: new UntypedFormControl('', [
      Validators.maxLength(9)
    ]),
    cityCode: new UntypedFormControl('', [
      Validators.maxLength(10)
    ]),
    city: new UntypedFormControl(null),
    address: new UntypedFormControl('', [
      Validators.required,
      Validators.maxLength(60)
    ]),
    uf: new UntypedFormControl(null, [Validators.maxLength(2)]),
    number: new UntypedFormControl('', [
      Validators.maxLength(60)
    ]),
    complement: new UntypedFormControl('', [
      Validators.maxLength(60)
    ]),
    neighborhood: new UntypedFormControl('', [
      Validators.maxLength(60)
    ]),
    regionCode: new UntypedFormControl(null),
    region: new UntypedFormControl('', [
      Validators.maxLength(30)
    ]),
    condominium: new UntypedFormControl('', [
      Validators.maxLength(20)
    ]),
    country: new UntypedFormControl('', [
      Validators.maxLength(20)
    ]),
    routeCode: new UntypedFormControl(null),
    deliveryRoute: new UntypedFormControl(null),
    referencePoint: new UntypedFormControl('', [
      Validators.maxLength(60)
    ]),
    branchCode: new UntypedFormControl('', [
      Validators.maxLength(10)
    ]),
    branch: new UntypedFormControl(null),
    salesmanCode: new UntypedFormControl(null),
    salesman: new UntypedFormControl(null),
    categoryCode: new UntypedFormControl(null),
    category: new UntypedFormControl(null),
    zone: new UntypedFormControl(null),
    group: new UntypedFormControl(null),
    departmentCode: new UntypedFormControl(null),
    department: new UntypedFormControl(null),
    subGroup: new UntypedFormControl(null),
    groupCode: new UntypedFormControl(null),
  });

  constructor(private validationService: ValidationService) {
    this.generalForm.disable();
  }

  get form() {
    return this.generalForm;
  }

  get fields(): FormBuildConfig[] {
    return [
      this.loadType(),
      this.loadFantasyName(),
      this.loadBranchCode(),
      this.loadBranch(),
      this.loadFinalConsumer(),
      this.loadCnpj(),
      this.loadRg(),
      this.loadStateRegistration(),
      this.loadMunicipalRegistration(),
      this.loadCNAE(),
      this.loadPostalCode(),
      this.loadCodeCity(),
      this.loadCity(),
      this.loadUf(),
      this.loadCountry(),
      this.loadAddress(),
      this.loadNeighborhood(),
      this.loadNumber(),
      this.loadZone(),
      this.loadComplement(),
      this.loadCondominium(),
      this.loadReference(),
      this.loadCodeSalesman(),
      this.loadSalesman(),
      this.loadCodeRegion(),
      this.loadRegion(),
      this.loadCodeDeliveryRoute(),
      this.loadDeliveryRoute(),
      this.loadCodeCategory(),
      this.loadCategory(),
      this.loadCodeDepartment(),
      this.loadDepartment(),
      this.loadCodeGroup(),
      this.loadGroup(),
      this.loadSubGroup()
    ];
  }

  private loadFinalConsumer(): FormBuildConfig {
    return {
      control: this.form.get(nameControlFinalConsumer) as UntypedFormControl,
      type: FormItemType.SELECT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Cons. Final',
        options: this.optionsFinalConsumer
      }
    };
  }

  private loadFantasyName(): FormBuildConfig {
    return {
      control: this.form.get(nameControlFantasyName) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 5,
      columnLg: 5,
      columnMd: 5,
      params: {
        label: 'Fantasia',
        message: 'Dever ter no mínimo (5) caracteres e no máximo (25). Digitados: '
      }
    };
  }

  private loadType(): FormBuildConfig {
    return {
      control: this.form.get(nameControlTypePerson) as UntypedFormControl,
      type: FormItemType.SELECT,
      name: SELECT_TYPE_PERSON,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Tipo',
        options: this.optionsTypePerson
      },
      handlerChange: this.selectTypePessoa()
    };
  }

  private loadBranchCode(): FormBuildConfig {
    return {
      control: this.form.get(nameControlBranchCode) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        type: 'number',
        message: 'Dever ter no máximo (20). Digitados: ',
        showCount: true
      }
    };
  }

  private loadBranch(): FormBuildConfig {
    return {
      control: this.form.get(nameControlBranch) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Filial',
        icon: 'search',
        name: 'filial-person'
      }
    };
  }

  private loadCnpj(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCnpj) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      name: CPNJ_OR_CPF,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'CNPJ',
        icon: 'search',
        mask: EnumMask.CNPJ,
        placeholder: '00.000.000/0000',
        message: 'Informe um CNPJ válido.',
        name: 'cnpj-person'
      },
      clickEvent: this.searchCnpj(),
      handlerBlur: this.onListenerChangeCnpj()
    };
  }

  private loadRg(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRg) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'RG'
      }
    };
  }

  private loadStateRegistration(): FormBuildConfig {
    return {
      control: this.form.get(nameControlStateRegistration) as UntypedFormControl,
      type: FormItemType.NUMBER,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Inscrição Estadual',
        message: 'Dever ter no máximo (25). Digitados: ',
        showCount: true
      }
    };
  }

  private loadMunicipalRegistration(): FormBuildConfig {
    return {
      control: this.form.get(nameControlMunicipalRegistration) as UntypedFormControl,
      type: FormItemType.NUMBER,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Inscrição Municipal',
        type: 'number',
        message: 'Dever ter no máximo (14). Digitados: ',
        showCount: true
      }
    };
  }

  private loadCNAE(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCNAEPerson) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'CNAE'
      }
    };
  }

  private loadPostalCode(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCepPerson) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'CEP',
        mask: EnumMask.CEP,
        placeholder: '      -  '
      },
      handlerChange: this.onListenerChangeCep()
    };
  }

  private loadCodeCity(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCityCodePerson) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        icon: 'search',
        type: 'number',
        name: 'codigo-cidade-person',
        message: 'Dever ter no máximo (10). Digitados: ',
        showCount: true
      },
      clickEvent: this.searchCodeCity(),
    };
  }

  private loadCity(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCityPerson) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      name: CIDADE,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Cidade',
        icon: 'plus',
        name: 'cidade-person',
        idList: 'cidadeId'
      },
      clickEvent: this.searchCity(),
      handlerChange: this.listenerEventChangeCidade(),
      handlerSelected: (item) => this.listenerItemSelected(item)
    };
  }

  private loadUf(): FormBuildConfig {
    return {
      control: this.form.get(nameControlUfPerson) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'UF'
      }
    };
  }

  private loadCountry(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCountryPerson) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'País',
        message: 'Dever ter no máximo (20). Digitados: ',
        showCount: true
      }
    };
  }

  private loadAddress(): FormBuildConfig {
    return {
      control: this.form.get(nameControlAddressPerson) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 5,
      columnLg: 5,
      columnMd: 5,
      params: {
        label: 'Endereço',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadNeighborhood(): FormBuildConfig {
    return {
      control: this.form.get(nameControlNeighborhood) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Bairro',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadNumber(): FormBuildConfig {
    return {
      control: this.form.get(nameControlNumber) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Número',
        type: 'number',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadZone(): FormBuildConfig {
    return {
      control: this.form.get(nameControlZone) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Zona',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadComplement(): FormBuildConfig {
    return {
      control: this.form.get(nameControlComplement) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Complemento',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadCondominium(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCondominium) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Condomínio',
        message: 'Dever ter no máximo (20). Digitados: ',
        showCount: true
      }
    };
  }

  private loadReference(): FormBuildConfig {
    return {
      control: this.form.get(nameControlReferencePoint) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 4,
      columnLg: 4,
      columnMd: 4,
      params: {
        label: 'Ponto de Referência',
        message: 'Dever ter no máximo (60). Digitados: ',
        showCount: true
      }
    };
  }

  private loadCodeSalesman(): FormBuildConfig {
    return {
      control: this.form.get(nameControlSalesmanCode) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        type: 'number'
      }
    };
  }

  private loadSalesman(): FormBuildConfig {
    return {
      control: this.form.get(nameControlSalesman) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON_ALPHANUMERIC,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Vendedor',
        icon: 'search',
        name: 'vendedor-person'
      }
    };
  }

  private loadCodeRegion(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRegionCode) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        type: 'number'
      },
    };
  }

  private loadRegion(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRegion) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Região',
        icon: 'search',
        name: 'regiao-person',
        message: 'Dever ter no máximo (30). Digitados: ',
        showCount: true,
        isValidateAlphanumeric: true
      },
      clickEvent: () => this.searchRegionCode()
    };
  }

  private loadCodeDeliveryRoute(): FormBuildConfig {
    return {
      control: this.form.get(nameControlRouteCode) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        type: 'number'
      }
    };
  }

  private loadDeliveryRoute(): FormBuildConfig {
    return {
      control: this.form.get(nameControlDeliveryRoute) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON,
      columnXl: 3,
      columnLg: 3,
      columnMd: 3,
      params: {
        label: 'Rota de Entrega',
        icon: 'search',
        name: 'rota-entrega-person',
        isValidateAlphanumeric: true
      },
      clickEvent: this.searchRoteDelivery()
    };
  }

  private loadCodeGroup(): FormBuildConfig {
    return {
      control: this.form.get(nameControlGroupCode) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        type: 'number'
      }
    };
  }

  private loadGroup(): FormBuildConfig {
    return {
      control: this.form.get(nameControlGroup) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Grupo'
      }
    };
  }

  private loadSubGroup(): FormBuildConfig {
    return {
      control: this.form.get(nameControlSubGroup) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'SubGrupo'
      }
    };
  }

  private loadCategory(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCategory) as UntypedFormControl,
      type: FormItemType.INPUT_BUTTON_ALPHANUMERIC,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Categoria',
        icon: 'search'
      }
    };
  }

  private loadCodeCategory(): FormBuildConfig {
    return {
      control: this.form.get(nameControlCategoryCode) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        type: 'number'
      }
    };
  }

  private loadCodeDepartment(): FormBuildConfig {
    return {
      control: this.form.get(nameControlDepartmentCode) as UntypedFormControl,
      type: FormItemType.TEXT,
      columnXl: 1,
      columnLg: 1,
      columnMd: 1,
      params: {
        label: 'Código',
        type: 'number',
        isValidateAlphanumeric: true
      }
    };
  }

  private loadDepartment(): FormBuildConfig {
    return {
      control: this.form.get(nameControlDepartment) as UntypedFormControl,
      type: FormItemType.INPUT_ALPHANUMERIC,
      columnXl: 2,
      columnLg: 2,
      columnMd: 2,
      params: {
        label: 'Departameto'
      }
    };
  }


  private searchCnpj() {
    return () => console.log(this.form.get('inicioAtividade').value);
  }

  private searchRegionCode() {
    return () => console.log('click event code region');
  }

  private searchCodeCity() {
    return () => this.handleClickIdCity();
  }

  private searchCity() {
    return () => console.log('click event city');
  }

  private selectTypePessoa() {
    return () => this.handleSelectTypePessoa();
  }

  searchRoteDelivery() {
    return () => console.log('route event');
  }

  private listenerEventChangeCidade() {
    return () => this.handleEventChangeCidade();
  }

  private listenerItemSelected(item) {
    return this.handleItemSelected(item);
  }

  public handlerChangeCep: () => void;

  private onListenerChangeCep() {
    return () => this.handlerChangeCep();
  }

  private onListenerChangeCnpj() {
    return () => this.handlerVerifyCnpjOrCpf();
  }
}
