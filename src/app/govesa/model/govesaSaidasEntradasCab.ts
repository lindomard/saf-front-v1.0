

export interface GovesaSaidasEntradasCab {
    secId?: number, 
    secIdPessoa?: number, 
    secNome?: String, 
    secDtInicio?: String, 
    secDtFinal?: String, 
    secPgInicio?: number, 
    secPgFinal?: number, 
    secUrlImg?: String, 
    secNomeArq?: String
    govesaSaidasEntradasDet?: GovesaSaidasEntradasDet[]  
}


export interface GovesaSaidasEntradasDet {
    dseId?: number, 
    dseIdCab?: number, 
    dseOrdem?: number, 
    dseLinha01?: String, 
    dseLinha02?: String, 
    dseNatOper?: String, 
    dseVeiculo?: String, 
    dseChassi?: String, 
    dseModelo?: String, 
    dseCategoria?: String, 
    dseCor?: String, 
    dseDataContabil?: String, 
    dseNumNfSaida?: number, 
    dseDataNfSaida?: String, 
    dseVlrIcmsSaida?:  number, 
    dseVlrFrete?:  number, 
    dseVlrIcmsRetido?:  number, 
    dseNumNfCompra?: number, 
    dseDataNfEntrada?: String, 
    dseCustoCompra?:  number, 
    dseVlrTotalCompra?:  number, 
    dseVlrIcmsCompra?:  number, 
    dseVlrVenda?:  number
}
    