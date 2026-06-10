// sel 28

import { FormGroup } from "@angular/forms";
import { CadservicosResumidoModel } from "./cadservicosModel";





export interface CadPessoasModel {
    cpConsisteCadpro?: number,
    cpQtdNfMensal?: number,
    cpEnderCodlocIbge?: string,
    cpDenom?: string,
    cpEnderCidade?: string,
    cpEnderuf?: string,
    cpUeveComputador?: string,
    cpCodusrInc?: number,
    cpCodusrUeve?: number,
    cpIe?: string,
    cpEnderCep?: string,
    cpConsisteCadpart?: string,
    cpCnpj?: string,
    cpConsisteData54Sintegra?: number,
    cpPastaDefault?: string,
    cpEnderNum?: string,
    cpEnderBairro?: string,
    cpId?: number,
    cpDtRefFin?: string,
    cpDtRefIni?: string,
    cpDathorInc?: Date,
    
    cpEnderLog?: string,
    cpDathorUeve?: Date,
    cpObs?: string,
    cpRazaoSocial?: string,
    cpEnderComplemento?: string,
    cpEmail?: string,
    cpFone?: string,

    cadpessoasServicos?: CadpessoasServicosModel[],
    cadpessoasUsuarios?: CadpessoasUsuariosModel[],




}




export interface CadpessoasProcessosModel {
    ppQtdarqSolicitados?: number,
    ppTipoArquivo?: number,
    ppQtdarqProcessado?: number,
    ppIdPessoa?: number,
    ppDtRefFin?: Date,
    ppId?: number,
    ppNome?: string,
    ppDtRefIni?: Date,

}





export interface CadpessoasServicosModel {
    psId?: number,
    psIdServicoCadservicosResumido?: CadservicosResumidoModel

}






export interface CadpessoasUsuariosModel {
    puFone?: string,
    puObs?: string,
    puIdPessoa?: number,
    puNome?: string,
    puWhatsapp?: string,
    puId?: number,
    puNivel?: number,
    puCpf?: string,
    puSenha?: string,
    puEmail?: string,

}







