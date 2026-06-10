import { MatTableDataSource } from "@angular/material/table";

export interface TabelaBaseC100Model {
    chaveId?: number,
    rc100Seq?: number,
    rc100CodMod?: String,
    rc100CodSit?: String,
    rc100Ser?: String,
    rc100NumDoc?: number,
    rc100ChvNfe?: String,
    rc100CodPart?: String,
    r0150Nome?: String,
    r0150Cnpj?: String,
    r0150Cpf?: String,
    rc100NfceCdataLink?: String,
    r0150Ie?: String,
    r0150CodMun?: String,
    r0150Suframa?: String,
    rc100DtDoc?: Date;
    rc100VlDoc?: number,
    rc100IndPgto?: String,
    rc100VlMerc?: number,
    r0000IndAtiv?: number,
    tabelaBaseRc170?: tabelaBaseRc170[]  


}


export interface tabelaBaseRc170 {
    rc170Id?: number,
    rc170SeqC100?: number,
    rc170NumItem?: number,
    r0200CodItem?: String,
    r0200DescrItem?: String,
    r0200CodAntItem?: String,
    r0200TipoItem?: String,
    rc170Qtd?: number,
    rc170Unid?: String,
    rc170VlItem?: number,
    rc170VlDesc?: number,
    rc170CstIcms?: String,
    rc170Cfop?: number,
    rc170VlBcIcms?: number,
    rc170AliqIcms?: number,
    rc170VlIcms?: number,
    rc170VlBcIcmsSt?: number,
    rc170AliqSt?: number,
    rc170VlIcmsSt?: number,
    rc170VlIpi?: number,
    rc170VlPis?: number,
    rc170CstCofins?: String,
    rc170VlFrt?: number,
    rc170VlSeg?: number,
    calcDA?: number,
    rc170VlAbatNt?: number,
}