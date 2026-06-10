import { FormGroup, UntypedFormGroup } from "@angular/forms";
import { Injectable } from "@angular/core";
import { safeCall } from "@base-core/safe-call";
import { CadpessoasSimplificadoModel } from "../../model/CadpessoasSimplificadoModel";
import { DATE_TIME_FORMAT, converterDateToString } from "@base-core/state/converter-date";



export function cadastrarPessoaMapper() {
    return new CadastrarPessoaMapper();
}
export class CadastrarPessoaMapper {



    converterFormToModel(cadpessoasForm: FormGroup): CadpessoasSimplificadoModel {
        
        return {
            cnpj: cadpessoasForm.get('cnpj').value,
            cpf: cadpessoasForm.get('cpf').value,
            dtRefIni: converterDateToString(
                cadpessoasForm.get('dtRefIni').value, DATE_TIME_FORMAT),
            
            dtRefFin: 
            converterDateToString(
             cadpessoasForm.get('dtRefFin').value, DATE_TIME_FORMAT),
             cpCodItemPadrao: cadpessoasForm.get('cpCodItemPadrao').value,
            nome: cadpessoasForm.get('nome').value,
            fone: cadpessoasForm.get('fone').value,
            email: cadpessoasForm.get('email').value,
            senha: cadpessoasForm.get('senha').value,
            whatsApp: cadpessoasForm.get('whatsApp').value
       }
    }




}