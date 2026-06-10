import { UntypedFormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { safeCall } from "@base-core/safe-call";
import { CadPessoasModel } from "../model/cadpessoasModel";
import { DATE_FORMAT, DATE_TIME_FORMAT, converterDateToString } from "@base-core/state/converter-date";



export function cadpessoasMapper() {
    return new CadpessoasMapper();
}
export class CadpessoasMapper {



    converterFormToModel(cadpessoasForm: UntypedFormGroup): CadPessoasModel {



        
        return {
            cpConsisteCadpro: cadpessoasForm.get('cpConsisteCadpro').value,
            cpQtdNfMensal: cadpessoasForm.get('cpQtdNfMensal').value,
            cpEnderCodlocIbge: cadpessoasForm.get('cpEnderCodlocIbge').value,
            cpDenom: cadpessoasForm.get('cpDenom').value,
            cpEnderCidade: cadpessoasForm.get('cpEnderCidade').value,
            cpEnderuf: cadpessoasForm.get('cpEnderuf').value,
            cpCodusrInc: cadpessoasForm.get('cpCodusrInc').value,
            cpCodusrUeve: cadpessoasForm.get('cpCodusrUeve').value,
            cpIe: cadpessoasForm.get('cpIe').value,
            cpEnderCep: cadpessoasForm.get('cpEnderCep').value,
            cpConsisteCadpart: cadpessoasForm.get('cpConsisteCadpart').value,
            cpCnpj: cadpessoasForm.get('cpCnpj').value,
            cpConsisteData54Sintegra: cadpessoasForm.get('cpConsisteData54Sintegra').value,
            cpPastaDefault: cadpessoasForm.get('cpPastaDefault').value,
            cpEnderNum: cadpessoasForm.get('cpEnderNum').value,
            cpEnderBairro: cadpessoasForm.get('cpEnderBairro').value,
            cpId: cadpessoasForm.get('cpId').value,
            cpDtRefFin:  converterDateToString(
                cadpessoasForm.get('cpDtRefFin').value, DATE_TIME_FORMAT),
                cpDtRefIni:  converterDateToString(
                    cadpessoasForm.get('cpDtRefIni').value, DATE_TIME_FORMAT),
            cpDathorInc: cadpessoasForm.get('cpDathorInc').value,
            cpEnderLog: cadpessoasForm.get('cpEnderLog').value,
            cpObs: cadpessoasForm.get('cpObs').value,
            cpRazaoSocial: cadpessoasForm.get('cpRazaoSocial').value,
            cpEnderComplemento: cadpessoasForm.get('cpEnderComplemento').value,
            cpEmail: cadpessoasForm.get('cpEmail').value,
            cpFone: cadpessoasForm.get('cpFone').value,
            cadpessoasServicos: cadpessoasForm.get('cadpessoasServicos')==null ? null :  cadpessoasForm.get('cadpessoasServicos').value,
            cadpessoasUsuarios: cadpessoasForm.get('cadpessoasUsuarios')==null ? null : cadpessoasForm.get('cadpessoasUsuarios').value
        }
    }




}