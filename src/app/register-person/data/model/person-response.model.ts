import { ImageRegisterModel } from './image-register.model';
import { LicensesModel } from './license.model';

export interface PersonResponse {
    client?: ClientResponse;
    reference?: Reference;
    licenses?: LicensesModel[];
    images?: ImageRegisterModel[];
    society?: Society[];
    generalData?: GeneralData;
    gunRegistration?: GunRegistration[];
    socialNetworks?: SocialNetwork[];
    contacts?: Contact[];
    clientHeader?: ClientHeader;
}

export interface ClientHeader {
    id?: number;
    companyName?: string;
    situation?: number;
    contact?: string;
    phone?: string;
}

export interface ClientResponse {
    id?: number;
    razaoSocial?: string;
    dataCadastro?: string;
    cnpj?: string;
    fantasyName?: string;
    contato?: string;
    phone?: string;
    dataNascimentoContato?: string;
    endereco?: string;
    numero?: number;
    complemento?: string;
    cep?: string;
    inscricaoEstadual?: string;
    inscricaoMunicipal?: string;
    filial?: number;
    referencePoint?: string;
    rg?: string;
    condominio?: string;
    vendedor?: number;
    bairro?: string;
    codigoCidade?: number;
    localTrabalho?: string;
    pais?: string;
    regiao?: string;
    situacao?: number;
    city?: string;
    uf?: string;
    regionCode?: string;
    routerCode?: number;
    deliveryRouter?: string;
    filialCode?: string;
    salesmanCode?: number;
    categoryCode?: number;
    category?: string;
    group?: string;
    groupCode?: number;
}

export interface Reference {
    id?: number;
    nome?: string;
    nomeOption?: string;
    telefone?: string;
    telefoneOption?: string;
    celular?: string;
    celularOption?: string;
    banco?: string;
    bancoOption?: string;
    agencia?: string;
    agenciaOption?: string;
    contaCorrente?: string;
    contaCorrenteOption?: string;
    gerente?: string;
    gerenteOption?: string;
    empresa?: string;
    empresaOption?: string;
    contato?: string;
    contatoOption?: string;
    telefoneBanco?: string;
    telefoneBancoOption?: string;
    telefoneComercial?: string;
    telefoneComercialOption?: string;
    emailComercialOption?: string;
    emailComercial?: string;
    relacionamento?: string;
    relacionamentoOption?: string;
    departmentCode?: number;
    department?: string;
    subGroup?: string;
}

export interface Society {
    id?: number;
    nome?: string;
    quota?: number;
    cargo?: string;
    assinaturaConjunta?: string;
    capitalSocial?: number;
}

export interface GeneralData {
    profession?: string;
    workCard?: string;
    company?: string;
    rgHusband?: string;
    phonePessoal?: string;
    email?: string;
    emailHusband?: string;
    husband?: string;
    cpfHusband?: string;
    placeWorkHusband?: string;
    cellHusband?: string;
    phoneHusband?: string;
    rg?: string;
    dateOfBirth?: string;
}


export interface SocialNetwork {
    id?: number;
    tipo?: string;
    nome?: string;
}

export interface Contact {
    id?: number;
    nome?: string;
    fone?: string;
    email?: string;
    finalidade?: string;
    categoria?: string;
    departamento?: string;
}

export interface Image{
    id?: number;
    descricao?: string;
    link?: string;
}

export interface GunRegistration {
    id?: number;
    tipo?: number;
    numero?: string;
}