export interface CamposTabbleFilPadCab {
    eventos?: string,
    tfpcIdUsr?: number,
    tfpcForm?: string,
    tfpcIdPessoa?: number,
    tfpcNome?: string,
    tfpcDathorInc?: Date,
    tfpcOrigemUeve?: number,
    tfpcCodusrUeve?: number,
    tfpcDathorUeve?: Date,
    tfpcOrigemInc?: number,
    tfpcCodusrInc?: number,
    tfpcId?: number,
    camposTableFilpadCampos? :CamposTableFilpadCampos,
    cadTableFilpadCpoOrdemResult?: CadTableFilpadCpoOrdemResult, 
    CamposGeralTabela?:CamposGeralTabela,
    camposConsultaPor?: CamposConsultaPor


}

export interface CamposTableFilpadCampos {

    tfpcTamanhoPercFixo: number,
    tfpcAlign?: string,
    tfpcMask?: string,
    tfpcId?: number,
    tfpcNomeCampo?: string,
    tfpcOrdem?: number,
    tfpcDescricaoCustom?: string,
    tfpcDescricaoOri?: string,
    tfpcTamanhoPerc?: number,
    tamanhoCampo?: number,
    qtdDec?: number,
    dataType?: number
}

export interface CadTableFilpadCpoOrdemResult {
    tforNomeCampo?: number,
    tforOrdem?: string,
    tforDescrescente?: number,
    tforId?: string
}

export interface CamposGeralTabela {

    tfpcTamanhoPercFixo?: number,
    tfpcAlign?: string
    tfpcMask?: string,
    tfpcId?: string,
    tfpcNomeCampo?: string
    tfpcOrdem?: number,
    tfpcDescricaoCustom?: string
    tfpcDescricaoOri?: string
    tfpcTamanhoPerc?: number,
    tamanhoCampo?: number,
    qtdDec?: number,
    dataType?: string
}


export interface CamposConsultaPor {
    tfpcTamanhoPercFixo?: number,
    tfpcAlign?: string
    tfpcMask?: string
    tfpcId?: number,
    tfpcNomeCampo?: string
    tfpcOrdem?: number,
    tfpcDescricaoCustom?: string
    tfpcDescricaoOri?: string
    tfpcTamanhoPerc?: number,
    tamanhoCampo?: number,
    qtdDec?: number,
    dataType?: string
}


