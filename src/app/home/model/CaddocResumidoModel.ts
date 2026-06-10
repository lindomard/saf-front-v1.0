import { MatTableDataSource } from "@angular/material/table";

export interface CaddocResumidoModel {
    cdrId?: number,
    cdrIdPessoa?: number,
    cdrNomeDoc?: String,
    cdrAnoMesDoc?: number,
    cdrDocComInv?: number,
    cdrQtdRegVal?: number,
    cdrQtdArqRec?: number,
    cdrQtdArqVal?: number,
    cdrQtdRegEsp?: number,
    cdrQtdRegRec?: number,
    cdrQtdArqEsp?: number,
    cdrRequerInv?: number,
}

