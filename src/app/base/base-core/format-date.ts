import { ItemSelectDoc } from '@base-shared/select/select.component';
import * as moment from 'moment';
const dateFormat = 'DD/MM/YYYY';
const dateFormatEua = 'YYYY-MM-DD';

export function formatDate(date: string): number {
    const dateValue = moment(date, dateFormat);
    return dateValue.valueOf();
}

export function formatDateToLocale(date: string): string {
    const dateValue = moment(date, dateFormatEua);
    return dateValue.format(dateFormat);
}

export function formatDateEuaToLong(date: string): number {
    const dateValue = moment(date, dateFormatEua);
    return dateValue.valueOf();
}

export function formatDateToStrngEua(date: string): string {
    const dateValue = moment(date, dateFormat);
    return dateValue.format(dateFormatEua);
}

export function formatLongToDateString(date: number): string {
    const dateValue = moment(date)
    return dateValue.format(dateFormatEua);
}


export function  optionsDocs(): ItemSelectDoc[] {
  return [
    { id: 1, name: 'Cartão CNPJ', possuiValidade: false},
    { id: 2, name: 'Inscrição Estadual', possuiValidade: false},
    { id: 3, name: 'Inscrição Municipal', possuiValidade: false},
    { id: 4, name: 'Inscrição PIS/PASEP', possuiValidade: false},
    { id: 5, name: 'CPF', possuiValidade: false},
    { id: 6, name: 'RG', possuiValidade: false},
    { id: 7, name: 'Passaporte', possuiValidade: true},
    { id: 8, name: 'Titulo de Eleitor', possuiValidade: false},
    { id: 9, name: 'Carteira de Trabalho', possuiValidade: false},
    { id: 10, name: 'CNH', possuiValidade: true},
    { id: 11, name: 'Comprovante de Endereço', possuiValidade: false},
    { id: 12, name: 'Registro Simplificado', possuiValidade: true},
    { id: 13, name: 'Alvará Anvisa', possuiValidade: true},
    { id: 14, name: 'Alvará Municipal', possuiValidade: true},
    { id: 15, name: 'Alvará de Funcionamento', possuiValidade: true},
    { id: 16, name: 'Alvará Corpo de Bombeiros', possuiValidade: true},
    { id: 17, name: 'SIGMA', possuiValidade: false},
    { id: 18, name: 'SINARM', possuiValidade: false},
    { id: 19, name: 'Contrato de Trabalho', possuiValidade: false},
    { id: 20, name: 'Termo de Recisão de Trabalho', possuiValidade: false},
    { id: 21, name: 'Contrato de experiência', possuiValidade: false},
    { id: 22, name: 'ATA de Assembléia de Condomínio', possuiValidade: false},
    { id: 23, name: 'Regimento Interno', possuiValidade: false},
    { id: 24, name: 'Convenção Coletiva', possuiValidade: false},
    { id: 25, name: 'Guia do Simples Nacional', possuiValidade: false},
    { id: 26, name: 'Contrato Social', possuiValidade: false},
    { id: 27, name: 'Comprovante Médico e de Segurança do Trabalho', possuiValidade: false},
    { id: 28, name: 'Comprovante de Recursos Humanos', possuiValidade: false},
    { id: 29, name: 'Contrato com Contabilidade', possuiValidade: false},
    { id: 30, name: 'Comprovante de Pagamento', possuiValidade: false},
    { id: 31, name: 'Registro Junta Comercial', possuiValidade: false},
    { id: 99, name: 'Outros', possuiValidade: false},
  ]
};