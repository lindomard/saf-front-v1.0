

export interface CadprocExecModel {
    cpId?: number,
    cpNome?: String,
    cpDatHorIni?: Date,
    cpDatHorTermino?: Date,
    cadprocessos?: cadprocessos

     
}

export interface cadprocessos {
    cpNome?: String,
    cpTemRelatorio?: number,
    cpId?: number
}


